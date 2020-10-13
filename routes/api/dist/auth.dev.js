"use strict";

var express = require('express');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var router = express.Router();

var _require2 = require('../../middleware/authen'),
    authen = _require2.authen;

var bcrypt = require('bcryptjs');

var config = require('config');

var jwt = require('jsonwebtoken');

var Person = require('../../models/Person'); // ???
//get user by token
//access private


router.get('/', authen, function _callee(req, res) {
  var person;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Person.findById(req.person.id).select('-password'));

        case 3:
          person = _context.sent;
          res.json(person);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // public post request
// authen by token

router.post('/', [check('account', 'Please input a valid account').not().isEmpty(), check('password', 'Password is required').exists()], function _callee2(req, res) {
  var errors, _req$body, account, password, person, isMatch, payload;

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
          _req$body = req.body, account = _req$body.account, password = _req$body.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Person.findOne({
            account: account
          }));

        case 7:
          person = _context2.sent;

          if (person) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: [{
              msg: 'Invalid Credentials'
            }]
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, person.password));

        case 12:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: [{
              msg: 'Password incorrect'
            }]
          }));

        case 15:
          //return jsonwebtoken
          payload = {
            person: {
              id: person.id,
              role: person.role
            }
          };
          jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
          }, function (err, token) {
            if (err) throw err;
            res.json({
              token: token
            });
          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0.message);
          res.status(500).send('Server error');

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 19]]);
});
module.exports = router;