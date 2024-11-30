import dotenv from "dotenv";
import mongoose from 'mongoose';


const connectDB = async () => {
  dotenv.config();
  try {
    const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.jhypi.mongodb.net/mydb?retryWrites=true&w=majority`;
    await mongoose.connect(mongoURI);
    console.log(`    🛢️ **Database**: Successfully connected
    🌐 **Current Status**: ONLINE
    🟢 **Port**: ${process.env.port}
     --------------------------------------------
    Thank you for using our service! 😊
    👨‍💻 **Happy Coding!** ✨
    `);
  } catch (error) {
    `
    🛢️ **Database**: Failed to connect
    🌐 **Current Status**: ONLINE
    🟢 **Port**: ${process.env.port}
     --------------------------------------------
    Thank you for using our service! 😊
    👨‍💻 **Happy Coding!** ✨
    `
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;