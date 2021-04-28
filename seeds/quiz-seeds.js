const { Quiz } = require('../models');

const quizData = [
  {
    quiz_name: 'test',
  },
  {
    user_id: [],
  },
  {
    question_length: [],
  },
];

const seedQuiz = () => Quiz.bulkCreate(quizData);

module.exports = seedQuiz;
