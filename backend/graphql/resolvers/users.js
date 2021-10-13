const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

// destructuration cuz its not an export default !
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}
module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
     
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
       const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not Found' //add general error in obj err
          throw new UserInputError('User not Found', {errors}) // send err 
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors})
      }
      const token = generateToken(user)
          return {
        ...user._doc,
        id: user._id,
        token

      }// 4- spread data

  },
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

      const token = generateToken(res) // 3- create token for user, which will take payload of user

      return {
        ...res._doc,
        id: res._id,
        token

      }// 4- spread data
    }
  }
}