import {
  GraphQLEnumType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import mutation from './mutation'
import query from './query'
import Driver from '../drivers/Driver'

export const History = new GraphQLObjectType({
  name: 'History',
  description: 'History',
  fields: () => ({
    status: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
})

export const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'Message',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    history: {
      type: new GraphQLList(History),
      resolve: async (message) => Driver.getHistory(message.id),
    },
  }),
})

export const User = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    name: { type: GraphQLString },
    messages: {
      type: new GraphQLList(Message),
      resolve: async (user) => Driver.getMessagesByUser(user.name),
    },
  }),
})

export default new GraphQLSchema({
  query,
  mutation,
})
