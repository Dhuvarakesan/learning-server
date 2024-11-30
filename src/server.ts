import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { protect } from "./app/middleware/middleware";
import publicRoutes from "./app/routes/public.routes";
import userRoutes from './app/routes/users.routes'; // Import the routes
import connectDB from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS
app.use(morgan('tiny')); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection
connectDB();
// Routes for public api without authentication
app.use('/api', publicRoutes);
// Routes for protected api with authentication
app.use('/api', protect, userRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send(`
    <pre>
    🎉 Welcome to the Node.js Express MongoDB API! 🎉
    --------------------------------------------
    🚀 The server is up and running smoothly!
    🌐 Current Status: ONLINE
    🟢 Port: ${port}
    📅 Timestamp: ${new Date().toISOString()}
    --------------------------------------------
    Thank you for using our service! 😊
    Happy coding! ✨
    </pre>
  `);
});



// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "An unexpected error occurred.",
    error: err.message,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`
    🎉 **Welcome to the My Express Server!** 🎉
    --------------------------------------------
    🌟 **Server Name**: My Express Server
    🚀 **Status**: Server is up and running smoothly!
    📅 **Timestamp**: ${new Date().toISOString()}`);
  });    