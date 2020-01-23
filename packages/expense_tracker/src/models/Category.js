const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CategorySchema = new Schema({
  title: String
});

CategorySchema.set('timestamps', true);

const Category = Mongoose.model('Category', CategorySchema);

module.exports = Category;
