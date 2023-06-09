'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in the options object
}

const spots = [
  {
    address: "334 Cabin Home",
    city: "Redwood",
    state: "California",
    country: "United States of America",
    lat: 39.7645358,
    lng: -120.4730327,
    name: "Cabin in the woods",
    description: "Convenient location and reasonable price",
    price: 80,
    previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-53733023/original/ecb8c127-51db-4fed-9a4f-543a2c5bc784.jpeg?im_w=1200", // Update with the actual URL for the image
    ownerId: 1
  },
  {
    address: "818 Hope Dr",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 50.7645358,
    lng: -12.4730327,
    name: "City Home",
    description: "Home in the city",
    price: 520,
    previewImage: "https://www.brownstoner.com/wp-content/uploads/2016/10/brooklyn-home-prices-surge.jpg", // Update with the actual URL for the image
    ownerId: 1
  },
  {
    address: "5111 Beach Home Dr",
    city: "Malibu",
    state: "California",
    country: "United States of America",
    lat: 30.7645358,
    lng: -22.4730327,
    name: "Luxury beach home",
    description: "Aesthetic beach home with sea views",
    price: 1612,
    previewImage: "https://assets3.thrillist.com/v1/image/3090534/828x610/flatten;crop;webp=auto;jpeg_quality=60.jpg", // Update with the actual URL for the image
    ownerId: 2
  },
  {
    address: "200 Road Way",
    city: "San Diego",
    state: "California",
    country: "United States of America",
    lat: 10.7645358,
    lng: -15.4730327,
    name: "Small home in SD!",
    description: "Prime location and near great mexican joints",
    price: 250,
    previewImage: "https://mediavault.point2.com/Image/Listing/8101351219_large.jpg", // Update with the actual URL for the image
    ownerId: 3
  },
  {
    address: "900 Red Bridge",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 120.7645358,
    lng: -25.4730327,
    name: "Nice home in colorful neighborhood",
    description: "Small cozy home in San Francisco",
    price: 174,
    previewImage: "https://www.extraspace.com/blog/wp-content/uploads/2020/05/best-places-to-buy-a-home-san-francisco-bernal-heights.jpg", // Update with the actual URL for the image
    ownerId: 2
  },
  {
    address: "9th Flower St",
    city: "Irvine",
    state: "California",
    country: "United States of America",
    lat: 20.7645358,
    lng: 25.4730327,
    name: "Safe home in safe area",
    description: "Great home for families and near grocery stores",
    price: 80,
    previewImage: "http://www.bcre.com/images/bontanica_turtle_ridge_home_720.jpg", // Update with the actual URL for the image
    ownerId: 3
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(spots);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
