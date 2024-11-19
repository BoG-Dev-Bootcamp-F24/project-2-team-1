import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  animals: mongoose.Types.ObjectId[]; // Array of ObjectId referencing Animal
  trainingLogs: mongoose.Types.ObjectId[]; // Array of ObjectId referencing TrainingLog
}

const UserSchema: Schema<IUser> = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  animals: [{ type: Schema.Types.ObjectId, ref: 'Animal' }],
  trainingLogs: [{ type: Schema.Types.ObjectId, ref: 'TrainingLog' }],
});

// Export User Model
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default UserModel;
