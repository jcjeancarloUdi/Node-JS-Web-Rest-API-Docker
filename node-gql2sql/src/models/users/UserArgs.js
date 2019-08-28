import {
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean
  } from 'graphql';
  
  export default {
    id: {type: GraphQLInt, description: 'SQL ID, unique identifier in SQL Table'},
    name: {type: GraphQLString, description: 'Nome do Usuário'},
    email: {type: GraphQLString, description: 'E-mail do Usuário'},
    password: {type: GraphQLString, description: 'Password do Usuário'},
    hasChanged: {type: GraphQLBoolean, description: 'flag alterado?'}
  }
  