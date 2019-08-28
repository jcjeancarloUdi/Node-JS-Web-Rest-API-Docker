import bcrypt from 'bcrypt';
import Conn from '../../config/db';
import Sequelize from 'Sequelize';

//Conn.query('SELECT * FROM users').success(function(result) {
//  console.log(result);
//}).error(function(err) {
//  console.log(err);
//});

const UserModel = Conn.define(
  'Users', 
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'The username can only contain letters and numbers',
        },
        len: {
          args: [3, 25],
          msg: 'The username needs to be between 3 and 25 characters long',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail Invalido',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: 'A senha precisa ter entre 5 e 100 caracteres',
        },
      },
    },
    hasChanged: {
      type: Sequelize.BOOLEAN,
      optional: true
    },
  },  
  {
		tableName: 'Users'
  }
);

export default UserModel;
