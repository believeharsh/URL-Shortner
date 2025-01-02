const mongoose = require("mongoose");

const connectMongo = async (url) => {
  try {
    // Attempt to connect to MongoDB
    await mongoose
      .connect(url)
      .then(() => console.log("mongoDb is connected now"));
  } catch (error) {
    console.log("error comes ", error);
    throw error;
  }
};

module.exports = connectMongo;
