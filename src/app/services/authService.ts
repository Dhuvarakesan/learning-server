import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.modles';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return { token, refreshToken };
}
