// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../lib/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, email, password, isAdmin } = req.body;

  try {
    console.log("Connecting to database...");
    await connectToDatabase(); // Initialize Mongoose connection
    console.log("Connected to database");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      createdAt: new Date(),
      animals: [],
      trainingLogs: []
    });

    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
}
