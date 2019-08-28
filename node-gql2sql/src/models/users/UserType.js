import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
  } from 'graphql';
  
  export default new GraphQLObjectType({
    name: 'User',
    description: 'Representa um Usuário',
    fields: () => {
      return {
        id: {type: GraphQLInt},
        reference: {type: GraphQLString},
        name: {type: GraphQLString},
        password: {type: GraphQLString},
        status: {type: GraphQLString},
        tran_num: {type: GraphQLInt},
        updatedAt: {
          type: GraphQLString,
          description: 'This desceription shows up in documentation in GraphiQL, make sure write some meaningful text here',
          resolve(user){
            return user.updatedAt.toString();
          }
        },
        hasChanged: {type: GraphQLBoolean},
        createdAt: {
          type: GraphQLString,
          description: 'This desceription shows up in documentation in GraphiQL, make sure write some meaningful text here',
          resolve(user){
            return ituserem.createdAt.toString();
          }
        }
  
      };
    }
  });
  