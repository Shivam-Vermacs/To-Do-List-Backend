const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../Models/userModel");
//importing verification token utility
const { verificationToken } = require("../Utils/VerificationToken");
const { generateTokenSetCookie } = require("../Utils/GenerateTOKENSetCOOKIE");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../mailtrap/emails");
//importing validators
const {
  registerValidation,
  loginValidation,
} = require("../Validator/userValidator");
const { verify } = require("crypto");

async function userRegister(req, res) {
  try {
    //parsing the validation
    const { success, data, error } = registerValidation.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: error.flatten(),
      });
    }

    const { username, email, password } = data;
    const lowercaseEmail = email.toLowerCase();

    const existingUser = await userModel.findOne({ email: lowercaseEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    //Hashing Password for security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Creation of Verification Token
    const VerificationToken = verificationToken();

    //   creating the user in the database
    const user = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      verificationToken: VerificationToken,
      verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now token expiration
    });

    //   generating token and setting cookie with userID
    generateTokenSetCookie(res, user._id);

    await sendVerificationEmail(user.email, VerificationToken);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function verifyEmail(req, res) {
  try {
    const { code } = req.body;
    const user = await userModel.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Verification code",
      });
    }
    //make isVerified to true  & token and expiry to null as they dont have any use now
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.username);
    res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Something went wrong while verifying email", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  userRegister,
  verifyEmail,
};
