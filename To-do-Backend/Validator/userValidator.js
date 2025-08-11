const { z } = require("zod");

//validation for register
const registerValidation = z.object({
  username: z.string().trim().min(1, "Username is required"),
  email: z.string().trim().min(8).max(100).email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(/[^A-Za-z0-9]/, "At least one special character"),
});

//validation for login
const loginValidation = z.object({
  email: z.string().trim().min(3).max(100).email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(/[^A-Za-z0-9]/, "At least one special character"),
});

module.exports = { registerValidation, loginValidation };
