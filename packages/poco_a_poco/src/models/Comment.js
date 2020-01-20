const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CommentSchema = new Schema({
  body: String,
  objective: { type: Schema.Types.ObjectId, ref: 'Objective' },
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now }
});

const Comment = Mongoose.model('Comment', CommentSchema);

module.exports = Comment;