const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const newError = require('../../utils/newError.js');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { firstName, lastName, email, password, username } = req.body;

      const existingUsername = await User.findOne({ where: {username: username}});
      const existingEmail = await User.findOne({ where: {email: email}});

      if (existingEmail){
        const err = newError(403, 'User already exists',[
          'User with that email already exists'
        ]);
        next(err);
      }

      if (existingUsername){
        const err = newError(403, 'User already exists',[
          'User with that username already exists'
        ]);
        next(err);
      }

      const user = await User.signup({ firstName, lastName, email, username, password });
      
      const token = await setTokenCookie(res, user);
      user.dataValues.token = token
      
      return res.json(user);

    }
  );
  
module.exports = router;