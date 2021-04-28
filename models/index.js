const Question = require('./Question');
const Quiz = require('./Quiz');
const Score = require('./Score');
const User = require('./User');

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { Question, Quiz, Score, User };

//havent added "project"