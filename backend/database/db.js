import mongoose from "mongoose";

const connectDb=()=>{
  mongoose.connect(process.env.MONGO_URL,)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
}

export default connectDb;
