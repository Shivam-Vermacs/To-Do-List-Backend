require("dotenv").config();
const express = require("express");
const app = express();
const { userRouter } = require("./Routes/userRoute");
const { connectDB } = require("./Config/connectionDB");
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/user", userRouter);
// app.use("/todos", todoRouter);

const startServer = async () => {
  try {
    await connectDB(); // Connect first
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
};

startServer();
