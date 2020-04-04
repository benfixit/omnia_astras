const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ChargeTypeSchema = new Schema({
  title: String
});

ChargeTypeSchema.set('timestamps', true);

const ChargeType = Mongoose.model('ChargeType', ChargeTypeSchema);

module.exports = ChargeType;
