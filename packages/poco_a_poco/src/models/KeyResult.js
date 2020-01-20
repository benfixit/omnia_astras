const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const KeyResultSchema = new Schema({
  description: String,
  objective: { type: Schema.Types.ObjectId, ref: 'Objective' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const KeyResult = Mongoose.model('KeyResult', KeyResultSchema);

module.exports = KeyResult;