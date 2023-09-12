const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // Comment id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Comment text
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Comment must be at least one character long
        len: [1]
      }
    },
    // User id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // References the User model's id
        model: 'user',
        key: 'id'
      }
    },
    // Post id
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // References the Post model's id
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
