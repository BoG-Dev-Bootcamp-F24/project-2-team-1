import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import TrainingLog from '../../lib/models/TrainingLog';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await connectToDatabase();

        if (req.method === 'GET') {
            const logs = await TrainingLog.find({ user: decoded.userId })
                .populate('animal', 'name breed')
                .sort({ date: -1 });
            return res.status(200).json({ logs });
        }

        if (req.method === 'POST') {
            const { title, animal, hoursTrained, date, description } = req.body;

            if (!title || !animal || !hoursTrained || !date || !description) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const newLog = await TrainingLog.create({
                user: decoded.userId,
                animal,
                title,
                date: new Date(date),
                description,
                hours: hoursTrained,
            });

            return res.status(201).json(newLog);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ message: 'Server error', error: errorMessage });
    }
}
