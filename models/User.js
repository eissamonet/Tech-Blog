const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Create our User model
checkPassword = (loginPw, hashedPw) => {
  return bcrypt.compareSync(loginPw, hashedPw);
}

// define table columns and configuration
User.init(
  {
    // User id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // User username
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // User email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // Email must be a valid email address
        isEmail: true
      }
    },
    // User password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Password must be at least four characters long
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;