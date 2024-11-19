import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnimal extends Document {
  name: string;
  breed: string;
  hoursTrained: number;
  imageUrl?: string;
  birthMonth?: string;
  birthDate?: number;
  birthYear?: number;
  note?: string;
  owner: mongoose.Types.ObjectId; // Reference to the User model
}

const AnimalSchema: Schema<IAnimal> = new Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  hoursTrained: { type: Number, default: 0 },
  imageUrl: { type: String },
  birthMonth: { type: String },
  birthDate: { type: Number },
  birthYear: { type: Number },
  note: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Safely define Animal model to avoid conflicts in development environments
const AnimalModel: Model<IAnimal> = mongoose.models.Animal
  ? (mongoose.models.Animal as Model<IAnimal>)
  : mongoose.model<IAnimal>('Animal', AnimalSchema);

export default AnimalModel;
