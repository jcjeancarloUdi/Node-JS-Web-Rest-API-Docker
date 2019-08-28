import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import { UserModel, UserType, UserArgs } from '../../models/users';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Retorno da Consulta Items e Users',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(UserType),
        args: UserArgs,
        resolve(root, args) {
          const opts = { where: args };
          if (args.hasOwnProperty("hasChanged")) {
            const hasChanged = args.hasChanged;
            delete args.hasChanged;
            // SQL may use 1 or 2 instead of a boolean type
            opts.where.hasChanged = hasChanged ? 1 : 0;
          }
          return UserModel.findAll(opts);
        }
      }      
    }
  }
});
