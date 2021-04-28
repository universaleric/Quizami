const { Score } = require('../models');

const scoreData = [

];

const seedData = () => Score.bulkCreate(scoreData);

module.exports = seedData;