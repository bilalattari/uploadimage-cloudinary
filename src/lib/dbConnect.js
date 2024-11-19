import mongoose from "mongoose";

export default async function connectDB() {
  const connected = await mongoose.connect(process.env.MONGODB_URI);
  console.log('DB connected')
}
