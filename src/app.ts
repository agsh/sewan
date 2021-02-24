import express from 'express'
import config from 'config'
import morgan from 'morgan'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema'

const app = express()
app.use(morgan('dev'))
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)
export const server = app.listen(config.get('server.port'), () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${config.get(
      'server.port',
    )}/graphql`,
  ),
)

export default app
