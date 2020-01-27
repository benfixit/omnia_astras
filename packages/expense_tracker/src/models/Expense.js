const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const ExpenseSchema = new Schema({
  description: String,
  budget: Number,
  actual: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() }
});

ExpenseSchema.set('timestamps', true);

const Expense = Mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;