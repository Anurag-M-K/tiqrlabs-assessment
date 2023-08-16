const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");


const signup = async (req,res) => {
    try {
        //generate a salt to use for hashing
        const salt = await bcrypt.genSalt(10);

        //hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        //create a new user using the user model with the hashed password
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        //save the new user to the database
        const savedUser = await newUser.save();
        
        res.status(200).json({
            success:true,
            message:"User registered successfully",
            user:savedUser
        });
        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({success:false,message:'An error occured during registration',
    error:error.message,
})
    }
}

const login = async (req,res) => {
    try {
        console.log("login controller ",req.body)
        const { email , password } = req.body;

        //check if the user with the given email exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        //compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            });
        }

        //create and sign a jwt token
        const token = jwt.sign({ userId : user._id}, "secrete", {
            expiresIn:"7d"
        });

        res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            user : {
                id:user._id,
                username:user.username,
                email:user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"An error occured during login",
            error:error.message
        })
    }
}

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success:true,
            users,
        });
        
    } catch (error) {
        res.status(500).json("interenal server error");
        console.log(error)
    }
}
module.exports = {
    signup,
    login,
    getAllUsers
}