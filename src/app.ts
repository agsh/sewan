import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema'

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)
export const server = app.listen(3000, () =>
  console.log('Running a GraphQL API server at http://localhost:3000/graphql'),
)

export default app
