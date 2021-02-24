import express from 'express'
import config from 'config'
import morgan from 'morgan'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema'

const app = express()
const port = config.get('server.port')

app.use(morgan('dev'))
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)
export const server = app.listen(port, () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`,
  ),
)

export default app
