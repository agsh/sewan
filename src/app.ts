import express from 'express'
import config from 'config'
import morgan from 'morgan'
import debug from 'debug'
import { graphqlHTTP } from 'express-graphql'
import { print } from 'graphql'
import schema from './schema'

const app = express()
const port = config.get('server.port')

app.use(morgan('dev'))
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    extensions: (info) => {
      // Logger for graphql requests and responses
      debug('sewan:graphql')(
        'Request:\n%s\nResponse:\n%s',
        print(info.document),
        JSON.stringify(info.result, null, '  '),
      )
      return undefined
    },
  }),
)
export const server = app.listen(port, () =>
  debug('sewan:server')(
    `Running a GraphQL API server at http://localhost:${port}/graphql`,
  ),
)

export default app
