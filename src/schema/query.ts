import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import Driver from '../drivers/Driver'
import { Message, User } from './index'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root',
  fields: () => ({
    messages: {
      type: new GraphQLList(Message),
      resolve: (_root) => Driver.getMessages(),
    },
    message: {
      type: Message,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_root, args) => Driver.getMessage(args.id),
    },
    users: {
      type: new GraphQLList(User),
      resolve: (_root) => Driver.getUsers(),
    },
    user: {
      type: User,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_root, args) => Driver.getUser(args.name),
    },
  }),
})
