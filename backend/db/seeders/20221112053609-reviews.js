'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Review } = require('../models');

const reviews = [
  {
    userId: 3,
    spotId: 1,
    review: "We had a delightful time at this cute A-frame cabin. Very clean inside and surprisingly spacious. The fire pit out back was perfect for roasting s'mores, with an ample supply of wood. Many nice touches throughout, and easy to communicate with host.",
    stars: 4,
  },
  {
    userId: 2,
    spotId: 1,
    review: "This cabin feels like a home away from home! The A frame structure of the cabin is really unique and is beautifully decorated on the inside. The fire pit adds to the outdoor ambiance and a spacious fridge gives you all the room you need to store your food. 10/10 would recommend!",
    stars: 4,
  },
  {
    userId: 3,
    spotId: 2,
    review: "Great place and fun get away!",
    stars: 5,
  },
  {
    userId: 1,
    spotId: 3,
    review: "Super cute place, most stylish house in the neighborhood. As soon as we asked in we felt right at home.",
    stars: 5,
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviews);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, null, {});
  }
};
