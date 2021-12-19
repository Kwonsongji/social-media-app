import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {  gql, useMutation } from '@apollo/client';
//import gql from 'graphql-tag';

import './style.scss';

 const REGISTER_USER = gql`
  mutation RegisterUser($username: String!){
   registerUser(username: $username) {
    username
    email
    password
    confirmPassword   
   }
  }`; 
const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword:''
  })
  const onChange = (event) => {
    setValues({...values, [event.target.name] :event.target.value})
  }
  // destructuration pour juste récupérer l'addUser, le loading
  // on passe la register user mutation à la méthode useMutation
  // pour les options, on ajoute la fonction update qui sera lancé si la mutation est bien exécuté
  // il s'agit d'une mutation alors il est nécéssaire d'add les variables
   const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: {
      username : values
    }
  })
  const onSubmit = (event) => {
    event.preventDefault();
    addUser()
  }
 
 
  return (
    <div className="form">
 
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register Page</h1>
        <Form.Input
          label="Pseudo"
          placeholder="pseudo"
          name="pseudo"
          value={values.username}
          onChange={onChange}
        >
        </Form.Input>
         <Form.Input
          label="Email"
          placeholder="email"
          name="email"
          value={values.email}
          onChange={onChange}
        >
        </Form.Input>
         <Form.Input
          label="Mot de passe"
          placeholder="mot de passe"
          name="mot de passe"
          value={values.password}
          onChange={onChange}
        >
        </Form.Input>
         <Form.Input
          label="Confimation du mot de passe"
          placeholder="confimation du mot de passe"
          name="confimation du mot de passe"
          value={values.confirmPassword}
          onChange={onChange}
        >
        </Form.Input>
        <Button type="sublit" primary></Button>
      </Form>
      
    </div>
  )
}

export default Register;
