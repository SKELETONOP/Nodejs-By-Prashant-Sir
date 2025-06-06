const express = require('express');
const authRouter = express.Router();

// Importing the authController to handle authentication-related routes
const authController = require('../controllers/authController');

// ✅ Cleaned Routes (no /store prefix)
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);
authRouter.get("/register", authController.getRegister);
authRouter.post("/register", authController.postRegister);


module.exports = authRouter;
