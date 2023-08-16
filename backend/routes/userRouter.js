const express = require("express");
const { signup, login , getAllUsers } = require("../controller/userController");
const { verifyJWT } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get("/allusers",verifyJWT , getAllUsers)

module.exports = router;