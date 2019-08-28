import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';

import { UserModel, UserType, UserArgs } from '../../models/users';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Inclusao e Alteracao de Registros do Usuario',
  fields (){
    return {
      addUser: {
        type: UserType,
        description: 'Inclusao de novos usuarios.',
        args: UserArgs,
        resolve(_,args){
          return UserModel.create({
            id: args.id,
            name: args.name,
            password: args.password,
            email: args.email,
            hasChanged: 0
          });
        } // resolve
      }, // addUser

      setPassword: {
        type: GraphQLInt,
        description: 'Alteracao de Senha.',
        args: UserArgs,
        resolve(_,args) {
          const password = args.password;
          delete args.password;
          return UserModel.update({ password: password, hasChanged: 0 }, { where: args });
        }
      },

      updateUser: {
        type: GraphQLInt,
        description: 'Alterar Usuario se existe.',
        args: UserArgs,
        resolve(_,args){
          args.hasChanged = 0;
          const search= { $or: [{ password: args.password }, { id: args.id }] };
          const retvals = UserModel.update(args,
            { where: search }
          );

          return retvals[0];
        } // resolve
      } // updateUser

    } // return
  } // fields
}); // Mutation
