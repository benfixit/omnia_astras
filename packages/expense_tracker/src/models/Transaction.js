const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const TransactionShema = new Schema({
  description: String,
  amount: Number,
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Transaction = Mongoose.model('Transaction', TransactionShema);

module.exports = Transaction;
