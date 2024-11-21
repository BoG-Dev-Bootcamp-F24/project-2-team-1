// models/User.js
const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  animals: [{ type: Schema.Types.ObjectId, ref: 'Animal' }],
  trainingLogs: [{ type: Schema.Types.ObjectId, ref: 'TrainingLog' }]
});

module.exports = models.User || model('User', userSchema);
