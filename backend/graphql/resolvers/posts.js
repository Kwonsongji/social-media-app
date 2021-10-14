const Post = require('../../models/Post');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_,{ postId}) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post; 
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err);
      }
    }  
  },
  Mutation: {
    // it will take the "_" (parent) and destructure of body
    // the third argument is context ( on a accès à la req.body, on aura accès au headers et on pourra déterminer si l'user est co')
    async createPost(_, { body }, context) {
      
    }
  }
}