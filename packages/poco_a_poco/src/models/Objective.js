const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ObjectiveSchema = new Schema({
  title: String,
  description: String,
  status: { type: Schema.Types.ObjectId, ref: 'Status' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Objective = Mongoose.model('Objective', ObjectiveSchema);

module.exports = Objective;