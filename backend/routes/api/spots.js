const express = require('express')
const router = express.Router();
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models')
const { requireAuth } = require("../../utils/auth")
const { handleValidationErrors } = require("../../utils/validation")

const newError = require('../../utils/newError.js');


router.get('/', async (req, res) => {
    let {
        page = 0,
        size = 20,
        // maxLat,
        // minLat,
        // minLng,
        // maxLng,
        minPrice,
        maxPrice
      } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page) || page < 0) page = 0;
    if (Number.isNaN(size) || size < 0) size = 0;

    if (page > 10) page = 10;
    if (size > 20) size = 20;

    const where = {};

    // if (maxLat) {
    //     where['lat'] = { [Op.lte]: maxLat };
    //   }
    //   if (minLat) {
    //     where['lat'] = { [Op.gte]: minLat };
    //   }
    //   if (maxLng) {
    //     where['lng'] = { [Op.lte]: maxLng };
    //   }
    //   if (minLng) {
    //     where['lng'] = { [Op.gte]: minLng };
    //   }
      if (minPrice) {
        where['price'] = { [Op.gte]: minPrice };
      }
      if (maxPrice) {
        where['price'] = { [Op.lte]: maxPrice };
      }

      const pagination = {};
      if ( page >= 1 && size>= 1){
          pagination.limit = size;
          pagination.offset = size * (page - 1);
      };

    const spots = await Spot.findAll({
        where,
        ...pagination
      }
    );
    res.json({"Spots" : spots, page, size})
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage
            },
            {
                model: User, as: 'Owner'
            },
            {
                model: Review
            }
        ]
    })

    if(spot) {
        const totalReviews = spot.dataValues.Reviews.length
        spot.dataValues.numReviews = totalReviews

        let sumofStars = 0
        spot.dataValues.Reviews.forEach(review =>{
            sumofStars += review.stars
        })

        spot.dataValues.avgStarRating = sumofStars/totalReviews

        return res.json(spot);
    } else {
        const err = newError(404, "Spot couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
    }
})

//Create a spot
router.post('/',requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        // lat,
        // lng,
        name,
        description,
        price,
        ownerId: req.user.id
    })

    if(newSpot.address.length > 250) {
      const err = newError(404, "Character limit of 250",[
          "Character limit of 250"
      ]);
      return next(err);
    }

    return res.json(newSpot)
  })

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images',requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = newError(404, "Spot couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
      }

    const newImage= await SpotImage.create({
        url,
        preview,
        spotId: spot.id
      })

      return res.json(newImage)
  })

//Edit a Spot
router.put('/:spotId/edit',requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;
    const updateSpot = await Spot.findByPk(spotId)
     if (updateSpot) {
      await updateSpot.update({
        address,
        city,
        state,
        country,
        // lat,
        // lng,
        name,
        description,
        price,
        previewImage
      });
      res.json(updateSpot)
    } else {
        const err = newError(404, "Spot couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
    }
  })

// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  try {
    const spotId = req.params.spotId;

    const deleteItem = await Spot.findByPk(spotId);

    if (deleteItem) {
      await deleteItem.destroy();
      return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      // Spot not found
      return res.status(404).json({
        message: "Spot not found",
        statusCode: 404,
      });
    }
  } catch (err) {
    // Handle any unexpected errors here
    return next(err);
  }
});



// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = newError(404, "Spot couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
      }

    const review = await Review.findAll({
        where : {
        spotId : spotId
      },
      include: [
        {
            model: User
        },
        {
            model: ReviewImage
        }
    ]
    })


    res.json({"Reviews" : review});

})

//Create a review for a spot based on the spot's id
router.post('/:spotId/reviews',requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = newError(404, "Spot couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
      }

    if(req.user.id === spot.ownerId){
        const err = newError(403, "You cannot review your own spot",[
          "You cannot review your own spot"
      ]);
      return next(err);
      }
    const existinguserReview = await Review.findOne({ where: {userId: req.user.id}});

    if(existinguserReview) {
      console.log("sdfsdf", existinguserReview)
        const err = newError(403, "User already has a review for this spot",[
            "User already has a review for this spot"
        ]);
        return next(err);
      }

    const newReview= await Review.create({
        review,
        stars,
        spotId: spot.id,
        userId: req.user.id
      })

      return res.json(newReview)
  })

// Get all Bookings by a Spot's id
router.get('/:spotId/bookings', async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = newError(404, "Spot couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
      }

    const booking = await Booking.findAll({
        where : {
        spotId : spotId
      },
      include: [
        {
            model: User
        }
    ]
    })

    if (booking) {
        res.json({"Bookings" : booking});
    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode" : "404"
          })
    }
})

//Create a booking from a spot based on the spot's id
router.post('/:spotId/bookings',requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = newError(404, "Spot couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
      }

    if(spot.ownerId === req.user.id) {
        const err = newError(403, "You can't book the spot your own",[
            "You can't book the spot you own"
        ]);
        return next(err);
    }

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    const existingBooking = await Booking.findOne({
        where: {
            [Op.or]: [
              { startDate: { [Op.between]: [startDateObj, endDateObj] } },
              { endDate: { [Op.between]: [startDateObj, endDateObj] } },
              { [Op.and]: {
                startDate: {[Op.lt]: startDateObj},
                endDate: { [Op.gt]: startDateObj}
              }}
            ],
          },
    });

    if (existingBooking){
        const err = newError(403, 'Sorry, this spot is already booked for the specified dates',[
          'Start date conflicts with an existing booking'
        ]);
        return next(err);
      }

    const newBooking= await Booking.create({
        startDate,
        endDate,
        spotId: spot.id,
        userId: req.user.id
      })

      return res.json(newBooking)
  })

//Delete spot image
router.delete("/:spotId/images", requireAuth, async(req, res, next) =>{
    const spotId = req.params.spotId;

    const deleteItem = await SpotImage.findOne({
        where: {spotId : spotId}
        });

    if (deleteItem) {
      await deleteItem.destroy({ where: { spotId: [spotId] }})
      res.json({
        "message": "Successfully deleted",
        "statusCode": "200"
      })
    } else {
        const err = newError(404, "Spot Image couldn't be found",[
            "Spot couldn't be found"
        ]);
        return next(err);
    }
  })

module.exports = router;
