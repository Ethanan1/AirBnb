'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { SpotImage } = require('../models');

const spotimages = [
  {
    spotId: 1,
    url: "first_spot.jpeg"
  },
  {
    spotId: 2,
    url: "second_spot.jpeg"
  }    
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotimages);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, null, {});
  }
};
