const express = require("express");
const app = express()
const PORT = 8080;
const userRouter = require("./routes/userRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/connection");
const eventRouter = require("./routes/eventRouter");
const http = require('http'); // Import the HTTP module
const  {Server} = require("socket.io");
const server = http.createServer(app); // Create an HTTP server


const io = new Server({
cors:{
    origin:"http://localhost:5173"
}
})

let onlineUsers = [];
const addNewUser = (username , socketId) => {
    !onlineUsers.some(user => user.username === username ) && 
    onlineUsers.push({username,socketId})
    console.log("onlicne user ",onlineUsers)
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

const getUser = (username) => {
    return onlineUsers.find(user=> user.username === username);
};

io.on("connection",(socket)=> { 
 console.log("user connected")
    socket.on("newUser",({username}) => {
        console.log("username,",username)
        addNewUser(username, socket.id)
    })
    
    socket.on("send-invitation",({sender,recievername,invitation}) => {
        console.log('invitation data recieved',sender,recievername,invitation)
        const reciever = getUser(recievername)
        io.to(reciever).emit("getInvitation",{
            sender,
            invitation
        })
    })

    socket.on("disconnect",() => {
        console.log("User disconnected")
        removeUser(socket.id)
    })
})
db(()=>{
    try {
       console.log("Database connected successfully"); 
    } catch (error) {
        console.log("Database connection failed",error);
    }    
});    

app.use(bodyParser.json());
app.use(cors());

app.use("/api",userRouter);
app.use("/api/event",eventRouter)
io.listen(5000)
server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
