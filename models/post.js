const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init(
    {
        // Post id
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        // Post title
        title: {
        type: DataTypes.STRING,
        allowNull: false
        },
        // Post content
        post_text: {
        type: DataTypes.TEXT,
        allowNull: false
        },
        // User id
        user_id: {
        type: DataTypes.INTEGER,
        references: {
            // References the User model's id
            model: 'user',
            key: 'id'
        }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
    );