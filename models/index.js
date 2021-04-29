const Question = require('./Question');
const Quiz = require('./Quiz');
const Score = require('./Score');
const User = require('./User');

Question.belongsTo(Quiz,{
foreignKey: "quiz_id"
});

Quiz.hasMany(Question,{
foreignKey: "quiz_id"
});

User.hasMany(Quiz, {
foreignKey: "user_id"
});

Score.belongsTo(Quiz,{
    foreignKey: "quiz_id", 
});
Score.belongsTo(User,{
    foreignKey: "user_id", 
});


module.exports = { Question, Quiz, Score, User };
