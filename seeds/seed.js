const seedQuestion = require('./question-seeds');
const seedQuiz = require('./quiz-seeds');
const seedScore = require('./score-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedQuestion ();
  console.log('\n----- QUESTION SEEDED -----\n');

  await seedQuiz();
  console.log('\n----- QUIZ SEEDED -----\n');

  await seedScore();
  console.log('\n----- SCORE SEEDED -----\n');

  await seedUser();
  console.log('\n----- USER SEEDED -----\n');

  process.exit(0);
};

seedAll();