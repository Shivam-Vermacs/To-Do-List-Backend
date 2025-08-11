const mongoose = require("mongoose");
//import dotenv later here and configure it
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected:${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connection to MongoDB`, error.message);
    process.exit(1);
    //1 is failure and 0 is success Status code
  }
};

module.exports = {
  connectDB,
};
