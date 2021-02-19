import path from 'path'
import Knex from 'knex'

const root = process.cwd()

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '', 10) || 5432,
  username: process.env.dbuser || process.env.DB_USER || 'postgres',
  password: process.env.dbpassword || process.env.DB_PASSWORD || '',
  name: 'postgres',
}

let db: Knex

export default async (): Promise<Knex> => {
  if (!db) {
    db = await Knex({
      client: 'pg',
      connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.name,
      },

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
