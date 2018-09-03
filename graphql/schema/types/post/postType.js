const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql');

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: {
      description: 'Unique id for post',
      type: GraphQLID,
    },
    title: {
      description: 'Main title of post',
      type: GraphQLString,
    },
    body: {
      description: 'Main text of post',
      type: GraphQLString,
    }
  }
});

module.exports = PostType;
