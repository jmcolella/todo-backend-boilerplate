const {
  GraphQLID,
} = require('graphql');
const User = require('../../../../../models/User');
const UserType = require('../../../types/user/userType');

exports.user = {
  type: UserType,
  args: {
    uuid: {
      type: GraphQLID,
    }
  },
  resolve: (root, params, ctx) => {
    if (params.uuid) {
      return User.where({ uuid: params.uuid }).fetch().then(user => (
        user.attributes
      ));
    }

    return ctx.user;
  }
};
