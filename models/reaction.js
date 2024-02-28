const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString()
  },
  username: {
    type: String,
    required: true
  },
});

reactionSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


module.exports = reactionSchema;