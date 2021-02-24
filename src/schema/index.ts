import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import mutation from './mutation'
import query from './query'
import { Driver } from '../drivers/Driver'

/**
 * History type
 * @property status Status
 * @property date Time when the status changed
 */
export const History = new GraphQLObjectType({
  name: 'History',
  description: 'History',
  fields: () => ({
    status: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
})

/**
 * Message type
 * @property type Type of the message. One of 'LOG', 'SMTP', 'HTTP'
 * @property body Body of the message
 * @property history Array of message statuses
 * @property messages Messages array
 */
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

/**
 * User type
 * @property name User's name
 * @property messages Messages array
 */
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
