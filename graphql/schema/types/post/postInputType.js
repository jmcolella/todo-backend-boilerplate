const {
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
} = require('graphql');

const PostInputType = new GraphQLInputObjectType({
  name: 'PostInputType',
  fields: {
    title: {
      description: 'Main title of post',
      type: GraphQLString,
    },
    body: {
      description: 'Main text of post',
      type: GraphQLString,
    },
    userId: {
      description: 'Id for user the post belongs to',
      type: GraphQLID,
    },
  }
});

module.exports = PostInputType;
