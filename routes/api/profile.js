const express = require('express');
const router = express.Router();
const { authen } = require('../../middleware/authen');
const {
  // authGetProfiles,
  authSetProfile,
  authDeleteProfile,
} = require('../../middleware/permissions/profile/authProfile');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const Person = require('../../models/Person');
const Profile = require('../../models/Profile');
// const request = require('request');
//get profile by id
//access private
// ????
router.get('/me', authen, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      person: req.person.id,
    }).populate('person', ['name', 'avatar']);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this person' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//post request
//create and update person profile
router.post(
  '/',
  [
    authen,
    check('email', 'Email is required').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {  email, phone, fullName } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.person = req.person.id;
    if (email) profileFields.email = email;
    if (phone) profileFields.phone = phone;
    if (fullName) profileFields.fullName = fullName;
    try {
      let profile = await Profile.findOne({ person: req.person.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { person: req.person.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Update Mark
//access private
router.put('/mark/:id', authen, authSetProfile, async (req, res) => {
  const mark = req.body.mark;
  try {
    let profile = await Profile.findById(req.params.id);
        profile.mark = mark;

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// get all profiles
// access private
router.get(
  '/',
  authen,
  async (req, res) => {
    try {
      if (req.person.role === 'user') {
        const profiles = await Profile.find()
          .populate({ path: 'person', select: 'name avatar account -_id' });
        profileFr = profiles.map((profile) => profile.person);
        return res.json(profileFr);
      }
      const profiles = await Profile.find().populate('person', [
        'account',
        'name',
        'avatar',
      ]);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//delete profile person
// delete person(student), delete post(comment)
router.delete('/:id', authen, authDeleteProfile, async (req, res) => {
  try {
    let personId = await Profile.findById(req.params.id).select('person -_id');
    await Profile.findOneAndRemove({ _id: req.params.id });
    await Person.findOneAndRemove({ id: personId });
    res.json({ msg: 'Person deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
