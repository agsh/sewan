import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { HTTP, Log, SMTP } from '../drivers'
import { Driver } from '../drivers/Driver'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    send: {
      type: GraphQLString,
      args: {
        user: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_parentValue, args) => {
        let driver: Driver
        switch (args.type) {
          case 'LOG':
            driver = new Log({ body: args.body, name: args.user })
            break
          case 'HTTP':
            driver = new HTTP({ body: args.body, name: args.user })
            break
          case 'SMTP':
          case 'EMAIL':
            driver = new SMTP({ body: args.body, name: args.user })
            break
          default:
            throw new Error('Only LOG, HTTP and SMTP types are supported')
        }
        return driver.run()
      },
    },
  }),
})
