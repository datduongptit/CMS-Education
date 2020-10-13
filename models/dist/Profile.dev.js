"use strict";

var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'person'
  },
  dateOfBirth: {
    type: Date // required: true,

  },
  degree: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String // required: true,

  },
  mark: {
    type: Array
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = Profile = mongoose.model('profile', profileSchema);