// model/Animal.js
const { Schema, model, models } = require('mongoose');

const animalSchema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    owner: { type: String, required: true },
    hoursTrained: { type: String, required: true },
    profilePicture: { type: String, required: false }

});

module.exports = models.Animal || model('Animal', animalSchema);