import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Environment variable MONGO must be set with a valid MongoDB URI."
  );
}

async function connectToDatabase(): Promise<void> {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected to MongoDB.");
    return;
  }
  if (connectionState === 2) {
    console.log("Already connecting to MongoDB...");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "nextapp",
      bufferCommands: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB.");
  }
}
export default connectToDatabase;
