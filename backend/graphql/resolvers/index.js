const postsResolvers = require('./posts');
const userResolvers = require('./users');
const comments = require('./comments');

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
};