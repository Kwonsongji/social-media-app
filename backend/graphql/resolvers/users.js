const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
  Mutation: {
  async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      },
      context,
      info) {
      // TODO: Validate user data
      // TODO: Make sure user doesnt already exist
      // TODO: hash password and create an auth token

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username:'This username is taken'
          }
        })
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      }) //1- new data

      const res = await newUser.save(); //2- save it and place it res

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, SECRET_KEY, { expiresIn: '1h' }); // 3- create token for user, which will take payload of user

      return {
        ...res._doc,
        id: res._id,
        token

      }// 4- spread data
    }
  }
}