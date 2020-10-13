const express = require('express');
const router = express.Router();
const { authen } = require('../../middleware/authen');
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const config = require('config');
const checkObjectId = require('../../middleware/checkObjectId');
const Person = require('../../models/Person');
const Post = require('../../models/Post');
const {
  authCreatePost,
  authDeleteComment,
} = require('../../middleware/permissions/post/posts');

// POST api/posts
// Create posts
// Private
router.post(
  '/',
  [authen, authCreatePost],
  [check('title', 'Title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Athor create post
      // Only admin can create posts
      // All can comment on all post
      let { title } = req.body;
      let newPost = new Post({
        title: title,
      });
      newPost = await newPost.save();

      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// PUT content
// Author: Admin
router.put('/content/:id', [authen, authCreatePost], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { subTitle, contentLesson, image, exam } = req.body;
  const newContent = {
    subTitle,
    contentLesson,
    image,
    exam,
  };
  try {
    let post = await Post.findById(req.params.id);
    post.content.unshift(newContent);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update post
// Author: Admin
router.post('/:id', [authen, authCreatePost], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { title, exam } = req.body;

    let updatePost = {
      title: title,
      exam: exam,
    };
    let posts = await Post.findById(req.params.id);
    if (posts) {
      let post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatePost },
        { returnOriginal: false }
      );
      return res.json(post);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update post
// Author: Admin
router.post('/content/:id', [authen, authCreatePost], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { subTitle, contentLesson, image, id } = req.body;

    let updateContent = {
      _id: id,
      subTitle: subTitle,
      contentLesson: contentLesson,
      image: image,
    };
    let contents = await Post.findOne({ _id: req.params.id }).select('content');
    let content = contents.content;
    let objIndex = content.findIndex((obj) => obj._id == id);
    content[objIndex] = updateContent;
    console.log(contents);
    await contents.save();
    res.json(contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET api/posts
// Get all posts
// Access private
router.get('/', authen, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE api/posts
// DELETE posts
// Access private
// Author: Admin
router.delete('/:id', authen, authCreatePost, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST api/posts/comments/:id
// Post comment on a post
// Access private
router.post(
  '/comment/:id',
  [
    authen,
    checkObjectId('id'),
    [check('text', 'Text is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const person = await Person.findById(req.person.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: person.name,
        avatar: person.avatar,
        person: req.person.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// DELETE api/comments/:id
// Delete comments by id
// Author: Admin can delete all comment
router.delete(
  '/comment/:id/:comment_id',
  [authen, authDeleteComment],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check person
      if (comment.person.toString() !== req.person.id) {
        // Admin can delete this
        return res.status(401).json({ msg: 'Person not authorized' });
      }

      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );

      await post.save();

      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
