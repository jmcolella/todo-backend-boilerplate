const { GraphQLObjectType } = require('graphql');
const { create } = require('../../fields/user');

const UserMutationType = new GraphQLObjectType({
  name: 'UserMutationType',
  fields: {
    create
  },
});

module.exports = UserMutationType;
