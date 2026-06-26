import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Database Connected successfully!")
  } catch (error) {
    console.log("❌ database Connection error", error.message)
    process.exit(1)
  }
}
export default connectDB