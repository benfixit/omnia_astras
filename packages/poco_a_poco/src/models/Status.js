const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const StatusSchema = new Schema({
  title: String
});

StatusSchema.set('timestamps', true);

const Status = Mongoose.model('Status', StatusSchema, 'statuses');

module.exports = Status;