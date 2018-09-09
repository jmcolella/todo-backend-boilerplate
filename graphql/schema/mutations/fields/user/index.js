const {
  GraphQLError,
  GraphQLNonNull,
} = require('graphql');
const omit = require('lodash/omit');
const User = require('../../../../../models/User');
const UserType = require('../../../types/user/userType');
const UserInputType = require('../../../types/user/userInputType');

exports.create = {
  type: UserType,
  args: {
    user: {
      type: new GraphQLNonNull(UserInputType)
    }
  },
  resolve: (root, params) => {
    const userParams = params.user;
    const paramsToSave = omit(userParams, 'password');

    return User.forge({ username: userParams.username })
      .fetch()
      .then(user => {
        if (user) { return Promise.reject('Username already taken'); }

        return User.hashPassword(userParams.password).then(hashedPassword => {
          const input = Object.assign({}, paramsToSave, {
            password: hashedPassword,
          });

          return User.forge(input).save();
        });
      })
      .then(model => model.attributes)
      .catch(error => new GraphQLError(error));
  }
};
