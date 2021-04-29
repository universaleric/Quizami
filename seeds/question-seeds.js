const { Question } = require('../models');

const questionData = [
  {
    question: 'question',
  },
  {
    response_1: 'response',
  },
  {
    response_2: 'response',
  },
  {
    response_3: 'response',
  },
  {
    response_4: 'response',
  },
  {
    correct_response: '2',
  },
  {
    quiz_id: '',
  },
];

const seedQuestion = () => Question.bulkCreate(questionData);

module.exports = seedQuestion;
