const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const InvestmentSchema = new Schema({
  description: String,
  amount: Number,
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() },
});

InvestmentSchema.set('timestamps', true);

const Investment = Mongoose.model('Investment', InvestmentSchema);

module.exports = Investment;
