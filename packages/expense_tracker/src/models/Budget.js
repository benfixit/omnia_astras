const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const BudgetSchema = new Schema({
  amount: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() }
});

BudgetSchema.set('timestamps', true);

const Budget = Mongoose.model('Budget', BudgetSchema);

module.exports = Budget;