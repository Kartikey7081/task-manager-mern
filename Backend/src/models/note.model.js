const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  done: {
    type: Boolean,
    default: false
  },

  starred: {
    type: Boolean,
    default: false
  },

  category: {
    type: String,
    default: "Work"
  },

  tags: {
    type: [String],
    default: []
  },

  dueDate: {
    type: String
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Note", noteSchema);