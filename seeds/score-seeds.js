const { Score } = require('../models');

const scoreData = [

    {
        quiz_id:[],
    },
    {
        user_id:[],
    },
    {
        Score:"",
    },
    {
        time:[],
    },
];

const seedData = () => Score.bulkCreate(scoreData);

module.exports = seedData;