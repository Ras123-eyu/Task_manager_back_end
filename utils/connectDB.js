import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI({
       serverSelectionTimeoutMS: 30000,    // Increase timeout
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,               // Disable mongoose buffering completely (recommended)
  maxPoolSize: 10,                   // Prevent connection exhaustion
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  family: 4           
    }));

    console.log("Database Connected");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnection;
