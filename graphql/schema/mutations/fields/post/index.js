const {
  GraphQLID,
} = require('graphql');
const PostType = require('../../../types/post/postType');
const PostInputType = require('../../../types/post/postInputType');
const Post = require('../../../../../models/Post').Post;

exports.create = {
  type: PostType,
  args: {
    input: {
      type: PostInputType,
    }
  },
  resolve: (root, params) => (
    Post
      .forge(params.input)
      .save()
      .then(post => post.attributes)
  )
};

exports.update = {
  type: PostType,
  args: {
    input: {
      type: PostInputType,
    },
    id: {
      type: GraphQLID,
    },
  },
  resolve: (root, params) => (
    Post
      .where({ id: params.id })
      .fetch()
      .save(params.input, { method: 'update' })
      .then(post => post.attributes)
  )
};

exports.delete = {
  type: PostType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: (root, params) => (
    Post
      .where({ id: params.id })
      .fetch()
      .destroy()
      .then(post => post)
  )
};
