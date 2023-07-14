const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const newError = require('../../utils/newError.js');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('invalid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('password required'),
    handleValidationErrors
  ];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if(!user) {
        const err = newError(401, 'Invalid credentials',[
          'Invalid credentials'
        ]);
        next(err);
      }

      const token = await setTokenCookie(res, user);
      user.dataValues.token = token

      return res.json(user)
    }
  );

// Log out
router.delete(
    '/',

    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        const token = setTokenCookie(res, user);
        return res.json({
          user: user.toSafeObject(),
          token
        });
      } else return res.json({ user: {} });
    }
  );



module.exports = router;
