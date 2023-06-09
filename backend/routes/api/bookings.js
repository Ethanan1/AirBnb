const express = require('express')
const router = express.Router();

const { requireAuth } = require("../../utils/auth")
const newError = require('../../utils/newError.js');
const { User, Booking,Review, ReviewImage } = require('../../db/models')

//Edit a Booking
router.put('/:bookingId',requireAuth, async (req, res, next) => {

    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body;

    const updateBooking = await Booking.findByPk(bookingId)
     if (updateBooking) {
      await updateBooking.update({
        startDate,
        endDate
      });
      return res.json(updateBooking)
    } else {
      const err = newError(404, "Booking couldn't be found",[
        "Booking couldn't be found"
    ]);
    return next(err);
    }
  })

//Delete a booking
router.delete("/:bookingId", requireAuth, async(req, res, next) =>{
  const bookingId = req.params.bookingId;

  const deleteItem = await Booking.findByPk(bookingId);

  if (deleteItem) {
    await deleteItem.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": "200"
    })
  } else {
    const err = newError(404, "Booking couldn't be found",[
      "Booking couldn't be found"
  ]);
  return next(err);
  }
})  

module.exports = router;