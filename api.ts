import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
// import axios from 'axios'

import { envConfig } from './config/config'

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: String!
    rollThreeDice: [Int]
  }
`)

const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
  },
  random: () => {
    const result = Math.round(Math.random() * 100)
    return result > 50 ? 'Win' + result : 'Lose' + result
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6))
  },
}

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(envConfig.port, () =>
  console.log(`Server run at ${envConfig.baseUrl}/graphql`)
)
