import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import Animal from '../../lib/models/Animal';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        // Connect to the database
        await connectToDatabase();

        if (req.method === 'GET') {
            // Fetch animals owned by the authenticated user
            const animals = await Animal.find({ owner: decoded.userId });
            return res.status(200).json({ animals });
        }

        if (req.method === 'POST') {
            // Create a new animal
            const { name, breed, hoursTrained, profilePicture, birthDate, note } = req.body;

            if (!name || !breed || typeof hoursTrained !== 'number') {
                return res.status(400).json({ message: 'Invalid input data' });
            }

            const newAnimal = new Animal({
                name,
                breed,
                hoursTrained,
                profilePicture,
                owner: decoded.userId,
                birthDate,
                note,
            });

            await newAnimal.save();

            return res.status(201).json({ message: 'Animal created successfully', animal: newAnimal });
        }

        // Method not allowed
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ message: 'Server error', error: errorMessage });
    }
}
