"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../../middleware/authen'),
    authen = _require.authen;

var _require2 = require('express-validator/check'),
    check = _require2.check,
    validationResult = _require2.validationResult;

var request = require('request');

var config = require('config');

var checkObjectId = require('../../middleware/checkObjectId');

var Person = require('../../models/Person');

var Post = require('../../models/Post');

var _require3 = require('../../middleware/permissions/post/posts'),
    authCreatePost = _require3.authCreatePost,
    authDeleteComment = _require3.authDeleteComment; // POST api/posts
// Create posts
// Private


router.post('/', [authen, authCreatePost], [check('title', 'Title is required').not().isEmpty() // check('subTitle', 'Subtitle is required').not().isEmpty(),
], function _callee(req, res) {
  var errors, title, newPost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context.prev = 3;
          // Athor create post
          // Only admin can create posts
          // All can comment on all post
          title = req.body.title;
          newPost = new Post({
            title: title
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(newPost.save());

        case 8:
          newPost = _context.sent;
          res.json(newPost);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
}); // PUT content
// Author: Admin

router.put('/content/:id', [authen, authCreatePost], function _callee2(req, res) {
  var errors, _req$body, subTitle, contentLesson, image, exam, newContent, post;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, subTitle = _req$body.subTitle, contentLesson = _req$body.contentLesson, image = _req$body.image, exam = _req$body.exam;
          newContent = {
            subTitle: subTitle,
            contentLesson: contentLesson,
            image: image,
            exam: exam
          };
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 8:
          post = _context2.sent;
          post.content.unshift(newContent);
          _context2.next = 12;
          return regeneratorRuntime.awrap(post.save());

        case 12:
          res.json(post);
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](5);
          console.error(_context2.t0.message);
          res.status(500).send('Server Error');

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 15]]);
}); // Update post
// Author: Admin

router.post('/:id', [authen, authCreatePost], function _callee3(req, res) {
  var errors, _req$body2, title, exam, updatePost, posts, post;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context3.prev = 3;
          _req$body2 = req.body, title = _req$body2.title, exam = _req$body2.exam;
          updatePost = {
            title: title,
            exam: exam
          };
          _context3.next = 8;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 8:
          posts = _context3.sent;

          if (!posts) {
            _context3.next = 14;
            break;
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.id, {
            $set: updatePost
          }, {
            returnOriginal: false
          }));

        case 12:
          post = _context3.sent;
          return _context3.abrupt("return", res.json(post));

        case 14:
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](3);
          console.error(_context3.t0.message);
          res.status(500).send('Server Error');

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 16]]);
}); // Update post
// Author: Admin

router.post('/content/:id', [authen, authCreatePost], function _callee4(req, res) {
  var errors, _req$body3, subTitle, contentLesson, image, id, updateContent, contents, content, objIndex;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context4.prev = 3;
          _req$body3 = req.body, subTitle = _req$body3.subTitle, contentLesson = _req$body3.contentLesson, image = _req$body3.image, id = _req$body3.id;
          updateContent = {
            _id: id,
            subTitle: subTitle,
            contentLesson: contentLesson,
            image: image
          };
          _context4.next = 8;
          return regeneratorRuntime.awrap(Post.findOne({
            _id: req.params.id
          }).select('content'));

        case 8:
          contents = _context4.sent;
          content = contents.content;
          objIndex = content.findIndex(function (obj) {
            return obj._id == id;
          });
          content[objIndex] = updateContent;
          console.log(contents);
          _context4.next = 15;
          return regeneratorRuntime.awrap(contents.save());

        case 15:
          res.json(contents);
          _context4.next = 22;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](3);
          console.error(_context4.t0.message);
          res.status(500).send('Server Error');

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 18]]);
}); // GET api/posts
// Get all posts
// Access private

router.get('/', authen, function _callee5(req, res) {
  var posts;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.find().sort({
            date: -1
          }));

        case 3:
          posts = _context5.sent;
          res.json(posts);
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // DELETE api/posts
// DELETE posts
// Access private
// Author: Admin

router["delete"]('/:id', authen, authCreatePost, function _callee6(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context6.sent;

          if (post) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            msg: 'Post not found'
          }));

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(post.remove());

        case 8:
          res.json({
            msg: 'Post removed'
          });
          _context6.next = 15;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);
          res.status(500).send('Server Error');

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // POST api/posts/comments/:id
// Post comment on a post
// Access private

router.post('/comment/:id', [authen, checkObjectId('id'), [check('text', 'Text is required').not().isEmpty()]], function _callee7(req, res) {
  var errors, person, post, newComment;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context7.prev = 3;
          _context7.next = 6;
          return regeneratorRuntime.awrap(Person.findById(req.person.id).select('-password'));

        case 6:
          person = _context7.sent;
          _context7.next = 9;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 9:
          post = _context7.sent;
          newComment = {
            text: req.body.text,
            name: person.name,
            avatar: person.avatar,
            person: req.person.id
          };
          post.comments.unshift(newComment);
          _context7.next = 14;
          return regeneratorRuntime.awrap(post.save());

        case 14:
          res.json(post.comments);
          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](3);
          console.error(_context7.t0.message);
          res.status(500).send('Server Error');

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[3, 17]]);
}); // DELETE api/comments/:id
// Delete comments by id
// Author: Admin can delete all comment

router["delete"]('/comment/:id/:comment_id', [authen, authDeleteComment], function _callee8(req, res) {
  var post, comment;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context8.sent;
          // Pull out comment
          comment = post.comments.find(function (comment) {
            return comment.id === req.params.comment_id;
          }); // Make sure comment exists

          if (comment) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            msg: 'Comment does not exist'
          }));

        case 7:
          if (!(comment.person.toString() !== req.person.id)) {
            _context8.next = 9;
            break;
          }

          return _context8.abrupt("return", res.status(401).json({
            msg: 'Person not authorized'
          }));

        case 9:
          post.comments = post.comments.filter(function (_ref) {
            var id = _ref.id;
            return id !== req.params.comment_id;
          });
          _context8.next = 12;
          return regeneratorRuntime.awrap(post.save());

        case 12:
          return _context8.abrupt("return", res.json(post.comments));

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0.message);
          res.status(500).send('Server Error');

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
module.exports = router;