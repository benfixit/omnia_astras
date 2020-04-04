const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ChargeSchema = new Schema({
  description: String,
  amount: Number,
  type: { type: Schema.Types.ObjectId, ref: 'ChargeType' }
});

ChargeSchema.set('timestamps', true);

const Charge = Mongoose.model('Charge', ChargeSchema);

module.exports = Charge;