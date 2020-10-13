const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {authen} = require('../../middleware/authen');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


const Person = require('../../models/Person')
//get user by token
//access private
router.get('/', authen, async (req, res) => {
  try {
    const person = await Person.findById(req.person.id).select('-password');
    res.json(person);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// public post request
// authen by token
router.post(
  '/',
  [
    check('account', 'Please input a valid account').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { account, password } = req.body;
    try {
        let person = await Person.findOne({ account: account });
        if (!person) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        const isMatch = await bcrypt.compare(password, person.password);
        if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Password incorrect' }] });
        //return jsonwebtoken
        const payload = {
            person: {
                id: person.id,
                role: person.role
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
