const { GraphQLObjectType } = require('graphql');
const {
  create,
  update
} = require('../../fields/post');

const PostMutationType = new GraphQLObjectType({
  name: 'PostMutationType',
  fields: {
    create,
    update,
  },
});

module.exports = PostMutationType;
