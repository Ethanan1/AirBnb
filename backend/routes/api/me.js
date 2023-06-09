const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Review, ReviewImage, Booking } = require('../../db/models')

router.get('/spots', requireAuth, async (req, res) => {

    const spots = await Spot.findAll({
        where: {
            ownerId : req.user.id
        }
    })
    return res.json({"Spots" : spots})
})

router.get('/reviews', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        where: {
            userId : req.user.id
        },
        include : [
            {
                model: User
            },
            {
                model: Spot
            },
            {
                model: ReviewImage
            }
    ]
    })
    return res.json({"Reviews" : reviews})
})

//Get all of the Current User's Bookings
router.get('/bookings', requireAuth, async (req, res) => {

    const reviews = await Booking.findAll({
        where: {
            userId : req.user.id
        },
        include : [
            {
                model: Spot
            }
    ]
    })
    return res.json({"Bookings" : reviews})
})

module.exports = router;