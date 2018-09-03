const { GraphQLObjectType } = require('graphql');
const user = require('./types/user');
const post = require('./types/post');

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    user: {
      type: user,
      resolve() {
        return {};
      },
    },
    post: {
      type: post,
      resolve() {
        return {};
      },
    },
  },
});

module.exports = MutationType;
