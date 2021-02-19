import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import Log from '../drivers/Log'
import { Message, User } from './index'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root',
  fields: () => ({
    messages: {
      type: new GraphQLList(Message),
      resolve: (_root) => Log.getMessages(),
    },
    message: {
      type: Message,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_root, args) => Log.getMessage(args.id),
    },
    users: {
      type: new GraphQLList(User),
      resolve: (_root) => Log.getUsers(),
    },
    user: {
      type: User,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (_root, args) => Log.getUser(args.name),
    },
  }),
})
