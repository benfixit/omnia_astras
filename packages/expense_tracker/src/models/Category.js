const Mongoose = require('mongoose');

const CategorySchema = Mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Category = Mongoose.model('Category', CategorySchema);

module.exports = Category;
