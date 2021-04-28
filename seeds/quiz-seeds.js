const { Quiz } = require('../models');

const quizData = [

    {
        quiz_name:"",
    },
    {
        user_id:[],
    },
    {
        question_length:[],
    },
];

const seedQuiz = () => Quiz.bulkCreate(quizData);

module.exports = seedQuiz;