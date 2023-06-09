'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


const { ReviewImage } = require('../models');


const reviewimages = [
  {
    reviewId: 1,
    url: "first_review.jpeg"
  },
  {
    reviewId: 2,
    url: "second_review.jpeg"
  }    
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewimages);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, null, {});
  }
};
