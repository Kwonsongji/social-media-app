const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');

// définie le type de query
const typeDefs = gql`
  type Post{
    id: ID!
    body:String!
    username:String!
    createdAt:String!
  }
  type Query{
    getPosts: [Post]
  }
`
// un res ol ver est une function qui renvoie une valeur pour un type schema 
// elle peut renvoyer un objet, être asynchrone
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch(err){
        throw new Error(err);
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })

server.listen({ port: 5000 })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })