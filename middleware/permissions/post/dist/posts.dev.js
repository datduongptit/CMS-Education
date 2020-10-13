"use strict";

// const authen = require('../../authen');
// Can something
function canCreatePost(person) {
  return person.role === 'admin';
}

function canDeleteComment(person) {
  return person.role === 'admin' || person.role === person.id;
} // Auth something


function authCreatePost(req, res, next) {
  if (!canCreatePost(req.person)) {
    res.status(401);
    return res.send('Not Allowed');
  }

  next();
}

function authDeleteComment(req, res, next) {
  if (!canDeleteComment(req.person)) {
    return res.status(401).send('Not Allowed');
  }

  next();
}

module.exports = {
  authCreatePost: authCreatePost,
  authDeleteComment: authDeleteComment
};