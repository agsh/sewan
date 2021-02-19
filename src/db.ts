import path from 'path'
import Knex from 'knex'
import config from 'config'

const root = process.cwd()

let db: Knex

export default async (): Promise<Knex> => {
  if (!db) {
    db = await Knex({
      client: 'pg',
      connection: config.get('db'),

      seeds: {
        directory: path.resolve(root, 'seeds'),
      },
      migrations: {
        directory: path.resolve(root, 'migrations'),
      },

      pool: { min: 0, max: 7 },
    })
  }
  return db
}
