const jwt = require('jsonwebtoken');
const config = require('config');
const Person = require('../models/Person');

async function authen(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return res.status(400).json({ msg: 'No token, Access Denied' });

  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.person = decoded.person;
    // const person = await Person.findById(req.person.id);
    // console.log(person);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = {
  authen,
};
