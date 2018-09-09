const {
  GraphQLInputObjectType,
  GraphQLString,
} = require('graphql');

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: {
      type: GraphQLString,
      description: 'The name of the user'
    },
    password: {
      type: GraphQLString,
      description: 'Password of the user'
    }
  }
});

module.exports = UserInputType;
