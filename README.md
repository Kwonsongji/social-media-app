# social-media-app
  1.SERVER APOLLO,DDB 
- go Mongo : db, cluster, user, ip 
- npm init -y 
- touch index.js .gitignore
- npm install apollo-server graphql mongoose
- go index.js fill & run server ( node index.js)
- server.listen({ port: 5000 })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })
- add url mongo, touch config.js fill in, 
- mkdir models fill in & require on index.js 

nb : on sépare les dépendances et les require files
  2.SIGNUP 
  -  definir le type de chaque input :
  go to typeDefs and fill in : 
   input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  -touch user (resolvers/) ( CONTROLLER) and fill:
  - validate user data:
     const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username:'This username is taken'
          }
        })
      }
  - hash password:
   ex: password = await bcrypt.hash(password, 12);
  - create new data :
  const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      })
  - save new data and create token for user, which will take payload of user :

    const res = await newUser.save(); //2- save it and place it res
      npm i jswonwebtoken bcryptsjs

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, SECRET_KEY, { expiresIn: '1h' }); // 3- create token for user, which will take payload of user
  - spread new data :
   return {
        ...res._doc,
        id: res._id,
        token

      }
  3.VALIDATE SIGNUP
  
  - mkdir util, touch validator and fill it ( valider chaque champs )