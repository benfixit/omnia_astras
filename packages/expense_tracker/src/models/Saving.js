const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const SavingSchema = new Schema({
  description: String,
  amount: Number,
  actual: Number,
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() },
});

SavingSchema.set('timestamps', true);

const Saving = Mongoose.model('Saving', SavingSchema);

module.exports = Saving;
