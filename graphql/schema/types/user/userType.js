const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const PostType = require('../post/postType');
const Posts = require('../../../../models/Post').Posts;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      description: 'Database id for user',
      type: GraphQLID,
    },
    username: {
      description: 'Unique screen name for user',
      type: GraphQLString,
    },
    password: {
      description: 'Secret password for user',
      type: GraphQLString,
    },
    posts: {
      description: 'Posts written by user',
      type: new GraphQLList(PostType),
      resolve: (root) => (
        Posts
          .query()
          .where({ user_id: root.id }) // eslint-disable-line camelcase
          .select()
          .then(res => res)
      )
    },
  },
});

module.exports = UserType;
