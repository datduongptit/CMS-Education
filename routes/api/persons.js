const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult, check } = require('express-validator/check');
const {authen} = require('../../middleware/authen');

const { authCreateUser } = require('../../middleware/permissions/profile/authProfile');


const Person = require('../../models/Person');

//post create user
//access: private
router.post(
    '/',
    [
        authen,
        authCreateUser,
        check('name', 'Name is required').not().isEmpty(),
        check('account', 'Please include a valid account').not().isEmpty(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, account, password, role } = req.body;

        try {
            let person = await Person.findOne({ account: account });
            if (person) return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

            //get users gravatar
            const avatar = gravatar.url(account, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            person = new Person({
                name,
                account,
                password,
                role,
                avatar
            })

            //hash password
            const salt = await bcrypt.genSalt(10);

            person.password = await bcrypt.hash(password, salt);

            await person.save();

            // //return jsonwebtoken
            // const payload = {
            //     person: {
            //         id: person.id
            //     }
            // }

            // jwt.sign(
            //     payload,
            //     config.get('jwtSecret'),
            //     { expiresIn: 36000 },
            //     (err, token) => {
            //         if (err) throw err;
            //         res.json({ token });
            //     })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }

    });

module.exports = router;
