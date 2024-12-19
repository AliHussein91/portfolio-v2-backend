import { Request, Response } from 'express-serve-static-core';
import { User } from "../model/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import { Blacklist } from '../model/blacklist.model';

dotenv.config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, image, email, role } = req.body;
        const user = new User({ username, password, image, email, role });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ error: error, massage: 'Error registering user' });
    }
}
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        const payload = { sub: user._id, role: user.role };
        const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    } else {
        try {
            const blacklist = new Blacklist({ token });
            await blacklist.save();
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(400).json({ error: error, message: 'Error logging out' });            
        }
    }
}