import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrainingLog extends Document {
  title: string; // Title of the training log
  date: Date; // Date of the log
  userName: string; // User's name
  animalName: string; // Animal's name
  animalBreed: string; // Animal's breed
  hoursLogged: number; // Hours logged for the session
  description: string; // Description of the log
}

const TrainingLogSchema: Schema<ITrainingLog> = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Default date to now
    userName: { type: String, required: true },
    animalName: { type: String, required: true },
    animalBreed: { type: String, required: true },
    hoursLogged: { type: Number, required: true, min: 0 }, // Ensure hours cannot be negative
    description: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

// Index for ordering by date
TrainingLogSchema.index({ date: -1 });

// Export TrainingLog Model
const TrainingLogModel: Model<ITrainingLog> =
  mongoose.models.TrainingLog || mongoose.model<ITrainingLog>('TrainingLog', TrainingLogSchema);
export default TrainingLogModel;
