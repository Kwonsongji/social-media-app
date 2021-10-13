const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
// destructuration cuz its not an export default !
const { validateRegisterInput } = require('../../util/validators')
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
      //  Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if (!valid) {
        throw new UserInputError('Errors', {errors})
      }
  
      //  Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username:'This username is taken'
          }
        })
      }
    //  hash password and create an auth token
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