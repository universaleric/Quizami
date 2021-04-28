const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct_response: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quiz_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quiz',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'question',
  }
);

module.exports = Question;
