import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name').index('user_name').unique()
  })
  await knex.schema.createTable('messages', (table) => {
    table.increments('id')
    table.string('body')
    table.enum('type', ['LOG', 'EMAIL', 'HTTP'], {
      useNative: true,
      enumName: 'message_type',
    })
    table.integer('user').unsigned()
    table.foreign('user').references('users.id')
  })
  await knex.schema.createTable('history', (table) => {
    table.enum('status', ['CREATED', 'PENDING', 'FINISHED', 'ERROR'], {
      useNative: true,
      enumName: 'message_status',
    })
    table.timestamp('date', { useTz: true }).defaultTo(knex.fn.now())
    table.integer('message').unsigned()
    table.foreign('message').references('messages.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('history')
  await knex.schema.dropTableIfExists('messages')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.raw(
    'drop type if exists message_type;\ndrop type if exists message_status;',
  )
}
