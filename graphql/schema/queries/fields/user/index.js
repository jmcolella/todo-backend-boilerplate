const {
  GraphQLID,
  GraphQLList,
} = require('graphql');
const User = require('../../../../../models/User');
const UserType = require('../../../types/user/userType');

exports.user = {
  type: UserType,
  args: {
    id: {
      type: GraphQLID,
    }
  },
  resolve: (root, params, ctx) => {
    if (params.id) {
      return User.where({ id: params.id }).fetch().then(user => (
        user.attributes
      ));
    }

    return ctx.user;
  }
};

exports.users = {
  type: new GraphQLList(UserType),
  resolve: () => (
    User.fetchAll().then(users => users.map(u => u.attributes))
  )
};
