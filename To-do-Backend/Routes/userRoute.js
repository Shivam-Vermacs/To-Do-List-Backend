const express = require("express");
const Router = express.Router();

//importing controller functions
const { userRegister, verifyEmail } = require("../Controllers/userController");
//Routes being defined Below

Router.post("/register", userRegister);

Router.post("/verify-email", verifyEmail);
//
// Router.post("/login", userLogin);
//
// Router.get("/viewtodos", viewTodos);

module.exports = { userRouter: Router };
