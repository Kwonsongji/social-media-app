const { UserInputError } = require('apollo-server')
const Post = require('../../models/Post');

module.exports = {
  // Mutation key
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        })
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift(
          body,
          username)
      }
    }
  }
}