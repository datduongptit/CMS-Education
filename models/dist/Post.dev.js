"use strict";

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: [{
    subTitle: {
      type: String,
      required: true
    },
    contentLesson: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  }],
  exam: {
    type: String
  },
  comments: [{
    person: {
      type: mongoose.Schema.Types.ObjectId
    },
    avatar: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      "default": Date.now
    }
  }],
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = Post = mongoose.model('post', postSchema);