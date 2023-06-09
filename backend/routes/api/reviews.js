const express = require('express')
const router = express.Router();

const { requireAuth } = require("../../utils/auth")
const newError = require('../../utils/newError.js');
const { User, Review, ReviewImage } = require('../../db/models')


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images',requireAuth, async (req, res, next) => {

    const reviewId = req.params.reviewId;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId)

    if(!review) {
        const err = newError(404, "Review couldn't be found",[
            "Review couldn't be found"
        ]);
        return next(err);
      }


    const newReview= await ReviewImage.create({
        url,
        reviewId: review.id
      })
  
      return res.json(newReview)
  })

//Edit a Review
router.put('/:reviewId',requireAuth, async (req, res, next) => {

    const reviewId = req.params.reviewId;    

    const { review, stars } = req.body;
    const updateReview = await Review.findByPk(reviewId)

     if (updateReview) {
      await updateReview.update({
        review,
        stars
      });
      return res.json(updateReview)
    } else {
        const err = newError(404, "Review couldn't be found",[
            "Review couldn't be found"
        ]);
        return next(err);
    }
  })

//Delete a review
  router.delete("/:reviewId", requireAuth, async(req, res, next) =>{
    const reviewId = req.params.reviewId;

    const deleteItem = await Review.findByPk(reviewId);
  
    if (deleteItem) {
      await deleteItem.destroy()
      return res.json({
        "message": "Successfully deleted",
        "statusCode": "200"
      })
    } else {
        const err = newError(404, "Review couldn't be found",[
            "Review couldn't be found"
        ]);
        return next(err);
    }
  })

//Delete a review image
router.delete("/:reviewId/images", requireAuth, async(req, res, next) =>{
  const reviewId = req.params.reviewId;

  const deleteItem = await ReviewImage.findOne({
      where: {reviewId : reviewId}
      });

  if (deleteItem) {
    await deleteItem.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": "200"
    })
  } else {
      const err = newError(404, "Review Image couldn't be found",[
          "Review couldn't be found"
      ]);
      return next(err);
  }
})    

module.exports = router;