const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ObjectiveSchema = new Schema({
  title: String,
  description: String,
  status: { type: Schema.Types.ObjectId, ref: 'Status' }
});

ObjectiveSchema.set('timestamps', true);

const Objective = Mongoose.model('Objective', ObjectiveSchema);

module.exports = Objective;