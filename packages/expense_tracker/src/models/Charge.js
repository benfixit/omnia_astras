const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const date = new Date();

const ChargeSchema = new Schema({
  description: String,
  amount: Number,
  type: { type: Schema.Types.ObjectId, ref: 'ChargeType' },
  year: { type: Number, default: date.getFullYear() },
  month: { type: Number, default: date.getMonth() },
  day: { type: Number, default: date.getDate() }
});

ChargeSchema.set('timestamps', true);

const Charge = Mongoose.model('Charge', ChargeSchema);

module.exports = Charge;