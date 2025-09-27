import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    return response;
  } catch (error) {
    console.log("Error in connectDB:", error);
  }
};

export default connectDB;