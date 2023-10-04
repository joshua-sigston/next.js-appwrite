import mongoose, { connection } from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected!')
    })
    
    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure mongo is running.' + err);
      process.exit();
    })
  } catch (error) {
    console.log('Something went wrong.');
    console.log(error);
  }
}