import mongoose from "mongoose";

const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
};

export default dbConnection;
