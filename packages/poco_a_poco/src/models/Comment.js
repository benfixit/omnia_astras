const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CommentSchema = new Schema({
  body: String,
  objective: { type: Schema.Types.ObjectId, ref: 'Objective' }
});

CommentSchema.set('timestamps', true);

const Comment = Mongoose.model('Comment', CommentSchema);

module.exports = Comment;