const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const StatusSchema = new Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Status = Mongoose.model('Status', StatusSchema, 'statuses');

module.exports = Status;