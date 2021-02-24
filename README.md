## Running

### Simple with the docker-compose
```
docker-compose up
```
Then we can go to `http://localhost:4567/` and start with the GraphiQL 

### Local running
* Install postgresql
* Install node packages: `npm i`
* Setup you database and other settings here: [/configure/default.json](/configure/default.json)
* Make the db migrations: `npm run migrate`
* Start the app: `npm start`

### Tests
`npm test`

## Class documentation
Can be found at [/docs/index.html](https://agsh.github.io/sewan/)

## Description
You can look at GraphQL schema here: [/schema.graphql](/schema.graphql). It consists of three entities:
* User who sends the message
* Message itself
* History of the message statuses

### Mutation
It calls `send` and it works with three transports: LOG, HTTP(POST to the HTTP-resource) and SMTP(e-mail).
The last two transports can be configured via the config. The example of usage:
```graphql
mutation {
  send(user: "a", type: "LOG", body: "a")
}
```
It creates the user, and the message in the db (user can later comes from auth system). Returns message id.
And starts check the status of the message delivery. Statuses can be: STARTED, PENDING, FINISHED or an ERROR.

After that we have four types of queries to check the status. The larger query to look at every entity is:
```graphql
query {
  users {
    name
    messages {
      type
      id
      history {
        status
        date
      }
    }
  }
}
```

Project written in typescript, uses jest unit test, which covers 99% of source. Also query builder `knex`. 
Sending email via `nodemailer`. Sending requests via `axios`.
For code formatting there are `prettier` and `eslint`.
And, of course `express-graphql`.
