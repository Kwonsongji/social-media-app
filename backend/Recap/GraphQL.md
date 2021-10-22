## typeDefs:
 définie le type de query

 ## Resolver ( RES OL VER => controller):
est une function qui renvoie une valeur pour un type de schema 
Elle peut renvoyer un objet, être asynchrone

## Mutation 
modifie la data 
https://medium.com/paypal-tech/graphql-resolvers-best-practices-cd36fdbcef55
ex : 

mutation{
  register(registerInput:{
    username:"fffzr"
    email:"user@email.com"
    password:"123"
    confirmPassword:"123"
  }){
    id
    email
    token
    username
    createdAt
}}

mutation{
  createPost(body:"rsdk,zd"){
    
      id
      body
      username
    }
  }
}

mutation{
  likePost(postId:"6165799136175bea3c41fb9c"){
    id
    body
    username
    likes{
      id
      username
    }
  }
}