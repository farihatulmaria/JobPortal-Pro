const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/User.Controller')
const { verifyToken } = require('../middlewares/verifyToken');

router.post("/signup",usersController.signUp)
router.post("/login",usersController.login)
router.get("/me",verifyToken,usersController.getMe)

module.exports = router