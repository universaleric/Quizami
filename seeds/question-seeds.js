const { Question } = require('../models');

const questionData = [

    {
        first_name: "julian",
    },
    {
        last_name: "almendarez",
    },
    {
        email: "julian@yahoo.com",
    },
    {
        username: "stbxzr",
    },
    {
        password: "n/a",
    },

];

const seedQuestion = () => Question.bulkCreate(questionData);

module.exports = seedQuestion;