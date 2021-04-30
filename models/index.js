const Question = require('./Question');
const Quiz = require('./Quiz');
const Score = require('./Score');
const User = require('./User');
const Comment = require('./Comment');

Question.belongsTo(Quiz,{
    foreignKey: "quiz_id"
});

Quiz.hasMany(Question,{
    foreignKey: "quiz_id"
});

User.hasMany(Quiz, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Quiz.belongsTo(User, {
    foreignKey: "user_id",
});

Score.belongsTo(Quiz,{
    foreignKey: "quiz_id", 
});
Score.belongsTo(User,{
    foreignKey: "user_id", 
});

Quiz.hasMany(Comment, {
    foreignKey: "quiz_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(Quiz, {
    foreignKey: "quiz_id",
});
  
Comment.belongsTo(User, {
    foreignKey: "user_id",
});



module.exports = { Question, Quiz, Score, User, Comment };
