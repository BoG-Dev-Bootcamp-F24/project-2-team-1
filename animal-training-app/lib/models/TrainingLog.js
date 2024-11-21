const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const trainingLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    animal: { type: Schema.Types.ObjectId, ref: 'Animal', required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: true, min: 0 },
});

module.exports = models.TrainingLog || model('TrainingLog', trainingLogSchema);
