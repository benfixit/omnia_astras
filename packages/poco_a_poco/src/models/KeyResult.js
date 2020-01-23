const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const KeyResultSchema = new Schema({
  description: String,
  objective: { type: Schema.Types.ObjectId, ref: 'Objective' },
  done: { type: Boolean, default: false }
});

KeyResultSchema.set('timestamps', true);

const KeyResult = Mongoose.model('KeyResult', KeyResultSchema);

module.exports = KeyResult;