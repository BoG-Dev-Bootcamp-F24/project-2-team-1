import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Handle POST request: Create a new user
  if (req.method === 'POST') {
    const { fullName, email, password, isAdmin } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false, // Default is not admin
      });

      res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // Handle GET request: Admin access to retrieve all users (without passwords)
  else if (req.method === 'GET') {
    try {
      const users = await User.find().select('-password'); // Exclude password field
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // Method not allowed
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
