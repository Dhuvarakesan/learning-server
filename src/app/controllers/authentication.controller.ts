import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/users.modles';


import { CustomError } from '../errorHandeling/customError';
import handleError from '../errorHandeling/handelError'; // Import the handleError function
import { generateToken } from '../utils/jwt';

// Authenticate a user
export const authenticateUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      console.log('email:',email);
      const user = await User.findOne({ email });
      console.log('user Details:',user);
      if (!user) {
        throw new CustomError("Invalid email or password.", 401, "AUTHENTICATION_FAILED", "The email or password is incorrect.");
      }
  
      // Compare the provided password with the stored hashed password
      // const decriplete
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('checking validty:',isMatch);
      if (!isMatch) {
        throw new CustomError("Invalid email or password.", 401, "AUTHENTICATION_FAILED", "The email or password is incorrect.");
      }
      const userId: string = user._id as string;
      const token = generateToken(userId, email);
      console.log('token:',token);
      res.status(200).json({
        status: "success",
        code: "200",
        message: "User authenticated successfully.",
        data: { id: user._id, email: user.email, role: user.role ,accessToken:token},
      });
    } catch (error) {
      handleError(res, error);
    }
  };