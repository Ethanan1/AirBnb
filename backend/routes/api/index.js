const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const meRouter = require('./me.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/me', meRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
