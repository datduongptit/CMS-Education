const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  account: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // default: 'user',
    enum: ['user', 'admin'],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Person = mongoose.model('person', personSchema);
