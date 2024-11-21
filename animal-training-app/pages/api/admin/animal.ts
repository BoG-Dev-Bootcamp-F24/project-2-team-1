import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import Animal from '../../../lib/models/Animal';
import User from '../../../lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        await connectToDatabase();

        // Fetch the requesting user's details
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: User is not an admin.' });
        }

        // Fetch all animals
        const animals = await Animal.find({}, '_id name breed owner hoursTrained profilePicture');
        res.status(200).json({ animals });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: errorMessage });
    }
}
