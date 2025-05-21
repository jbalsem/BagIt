const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  groceryStore: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: String } // optional: who added the item
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
