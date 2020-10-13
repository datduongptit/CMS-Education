"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../../middleware/authen'),
    authen = _require.authen;

var _require2 = require('../../middleware/permissions/profile/authProfile'),
    authGetProfiles = _require2.authGetProfiles,
    authSetProfile = _require2.authSetProfile,
    authDeleteProfile = _require2.authDeleteProfile;

var _require3 = require('express-validator/check'),
    check = _require3.check,
    validationResult = _require3.validationResult; // const request = require('request');


var config = require('config');

var Person = require('../../models/Person');

var Profile = require('../../models/Profile'); //get profile by id
//access private
// ????


router.get('/me', authen, function _callee(req, res) {
  var profile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Profile.findOne({
            person: req.person.id
          }).populate('person', ['name', 'avatar']));

        case 3:
          profile = _context.sent;

          if (profile) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'There is no profile for this person'
          }));

        case 6:
          res.json(profile);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //post request
//create and update person profile

router.post('/', [authen, check('email', 'Email is required').isEmail(), check('phone', 'Phone is required').not().isEmpty()], function _callee2(req, res) {
  var errors, _req$body, dateOfBirth, degree, email, phone, address, profileFields, profile;

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
          _req$body = req.body, dateOfBirth = _req$body.dateOfBirth, degree = _req$body.degree, email = _req$body.email, phone = _req$body.phone, address = _req$body.address; //build profile object

          profileFields = {};
          profileFields.person = req.person.id;
          if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
          if (degree) profileFields.degree = degree;
          if (email) profileFields.email = email;
          if (phone) profileFields.phone = phone;
          if (address) profileFields.address = address;
          _context2.prev = 11;
          _context2.next = 14;
          return regeneratorRuntime.awrap(Profile.findOne({
            person: req.person.id
          }));

        case 14:
          profile = _context2.sent;

          if (!profile) {
            _context2.next = 22;
            break;
          }

          _context2.next = 18;
          return regeneratorRuntime.awrap(Profile.findOneAndUpdate({
            person: req.person.id
          }, {
            $set: profileFields
          }, {
            "new": true
          }));

        case 18:
          profile = _context2.sent;
          _context2.next = 21;
          return regeneratorRuntime.awrap(profile.save());

        case 21:
          return _context2.abrupt("return", res.json(profile));

        case 22:
          //create
          profile = new Profile(profileFields);
          _context2.next = 25;
          return regeneratorRuntime.awrap(profile.save());

        case 25:
          res.json(profile);
          _context2.next = 32;
          break;

        case 28:
          _context2.prev = 28;
          _context2.t0 = _context2["catch"](11);
          console.error(_context2.t0.message);
          res.status(500).send('Server error');

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[11, 28]]);
}); // Update Mark
//access private

router.put('/mark/:id', authen, authSetProfile, function _callee3(req, res) {
  var mark, profile;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mark = req.body.mark;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Profile.findById(req.params.id));

        case 4:
          profile = _context3.sent;
          profile.mark = mark;
          _context3.next = 8;
          return regeneratorRuntime.awrap(profile.save());

        case 8:
          res.json(profile);
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0.message);
          res.status(500).send('Server error');

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 11]]);
}); // get all profiles
// access private

router.get('/', authen, function _callee4(req, res) {
  var _profiles, profiles;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (!(req.person.role === 'user')) {
            _context4.next = 7;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(Profile.find().populate({
            path: 'person',
            select: 'name avatar -_id'
          }));

        case 4:
          _profiles = _context4.sent;
          profileFr = _profiles.map(function (profile) {
            return profile.person;
          });
          return _context4.abrupt("return", res.json(profileFr));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(Profile.find().populate('person', ['name', 'avatar']));

        case 9:
          profiles = _context4.sent;
          res.json(profiles);
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);
          res.status(500).send('Server Error');

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //delete profile person
// delete person(student), delete post(comment)

router["delete"]('/:id', authen, authDeleteProfile, function _callee5(req, res) {
  var personId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Profile.findById(req.params.id).select('person -_id'));

        case 3:
          personId = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(Profile.findOneAndRemove({
            _id: req.params.id
          }));

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(Person.findOneAndRemove({
            id: personId
          }));

        case 8:
          res.json({
            msg: 'Person deleted'
          });
          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);
          res.status(500).send('Server Error');

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = router;