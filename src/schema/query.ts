import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { Driver } from '../drivers/Driver'
import { Message, User } from './index'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root',
  fields: () => ({
    // Get all the sent messages
    messages: {
      type: new GraphQLList(Message),
      resolve: (_root) => Driver.getMessages(),
    },
    // Get the message by the id
    message: {
      type: Message,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_root, args) => Driver.getMessage(args.id),
    },
    // Get all users
    users: {
      type: new GraphQLList(User),
      resolve: (_root) => Driver.getUsers(),
    },
    // Get user by the name
    user: {
      type: User,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_root, args) => Driver.getUser(args.name),
    },
  }),
})
