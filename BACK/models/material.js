const mongoose = require('mongoose');

// Define the schema for Material
const MaterialSchema = new mongoose.Schema({
  user: { type: String, required: true },
  material_name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }, // Ensure date format is ISO format
  time: { type: String, required: true },
  updatedby:String
});

// Create a model from the schema
const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
