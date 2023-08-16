const express = require("express");
const { signup, login , getAllUsers ,invitation , getAllInvitations} = require("../controller/userController");
const { verifyJWT } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get("/allusers",verifyJWT , getAllUsers);
router.post("/invite/:id",verifyJWT,invitation)
router.get("/getallinvitations",verifyJWT,getAllInvitations)


module.exports = router;