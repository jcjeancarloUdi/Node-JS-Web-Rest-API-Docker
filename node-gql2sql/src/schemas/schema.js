import { GraphQLSchema } from 'graphql';
import Query from '../resolvers/users/Query.js';
import Mutation from '../resolvers/users/Mutation.js';

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
