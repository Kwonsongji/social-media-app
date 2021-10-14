// Middleware pour vérifier l'authentification
const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config')
module.exports = (context) => {
  // on récupère l'header: // context = { ... headers }
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    // si il y a bien l'header, on veut récupérer le token
    // par convention, on envoie la valeur : Bearer ... (...:token)
    // on divise la String en 2 Bearer + token [1]
    // on vérifie le jeton 
    // on détail l'erreur 
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    throw new Error('Authentication token must be \'Bearer [token]')
  }
  throw new Error('Authentication header must be provided')

}