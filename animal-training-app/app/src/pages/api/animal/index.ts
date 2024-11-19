import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '../../../utils/db';
import Animal, { IAnimal } from '../../../models/Animal';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Handle POST request: Create a new animal
  if (req.method === 'POST') {
    const { name, breed, owner, hoursTrained, imageUrl, birthMonth, birthDate, birthYear, note } = req.body;

    // Validate input
    if (!name || !breed || !owner) {
      return res.status(400).json({ message: 'Missing required fields: name, breed, owner' });
    }

    try {
      // Ensure the owner exists
      const user = await User.findById(owner);
      if (!user) {
        return res.status(400).json({ message: 'Owner does not exist' });
      }

      // Create a new animal
      const newAnimal = await Animal.create<IAnimal>({
        name,
        breed,
        owner,
        hoursTrained: hoursTrained || 0,
        imageUrl,
        birthMonth,
        birthDate,
        birthYear,
        note,
      });

      // Add the animal to the owner's animal list
      user.animals.push(newAnimal._id as mongoose.Types.ObjectId); // Explicitly cast _id to ObjectId
      await user.save();

      res.status(200).json({ message: 'Animal created successfully', animal: newAnimal });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // Handle PATCH request: Update hours trained for an animal
  else if (req.method === 'PATCH') {
    const { animalId, hoursTrained } = req.body;

    // Validate input
    if (!animalId || hoursTrained == null) {
      return res.status(400).json({ message: 'Missing required fields: animalId, hoursTrained' });
    }

    try {
      // Find the animal
      const animal = await Animal.findById(animalId);
      if (!animal) {
        return res.status(400).json({ message: 'Animal does not exist' });
      }

      // Update hours trained
      animal.hoursTrained = hoursTrained;
      await animal.save();

      res.status(200).json({ message: 'Animal updated successfully', animal });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // Method not allowed
  else {
    res.setHeader('Allow', ['POST', 'PATCH']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
