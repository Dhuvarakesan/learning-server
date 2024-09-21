import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from './app/routes/users.routes'; // Import the routes
import connectDB from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection
connectDB();

// Routes
app.use('/api', userRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("MongoDB server is UP NOW!");
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
  console.log(`[server]: Server is running at http://localhost:${port}`);
});