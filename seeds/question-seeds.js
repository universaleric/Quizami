const { Question } = require('../models');

const questionData = [

    {
        question:"",
    },
    {
        response_1:"",
    },
    {
        response_2:"",
    },
    {
        response_3:"",
    },
    {
        response_4:"",
    },
    {
        correct_response:"",
    },
    {
        quiz_id:[],
    },
];

const seedQuestion = () => Question.bulkCreate(questionData);

module.exports = seedQuestion;