const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const NoteSchema = new Schema({
  description: String
});

NoteSchema.set('timestamps', true);

const Note = Mongoose.model('Note', NoteSchema);

module.exports = Note;