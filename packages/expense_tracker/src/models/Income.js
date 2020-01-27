const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const IncomeSchema = new Schema({
  description: String,
  amount: Number,
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() },
});

IncomeSchema.set('timestamps', true);

const Income = Mongoose.model('Income', IncomeSchema);

module.exports = Income;
