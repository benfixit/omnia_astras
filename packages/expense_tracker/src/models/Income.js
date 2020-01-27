const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const IncomeShema = new Schema({
  description: String,
  amount: Number,
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() },
});

IncomeShema.set('timestamps', true);

const Income = Mongoose.model('Income', IncomeShema);

module.exports = Income;
