const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const StatusSchema = new Schema({
  title: String,
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Status = Mongoose.model('Status', StatusSchema);

module.exports = Status;