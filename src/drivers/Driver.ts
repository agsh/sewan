import dbConnect from '../db'

export enum Type {
  LOG = 'LOG',
  HTTP = 'HTTP',
  EMAIL = 'EMAIL',
}

export enum Status {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export interface DriverOptions {
  name: string
  body: string
}

interface CommonDriverOptions extends DriverOptions {
  type: Type
}

/**
 * Common abstract class for all drivers
 */
export abstract class Driver {
  private readonly name: string

  public readonly body: string

  private readonly type: Type

  /**
   * Id of the message in the database
   * @private
   */
  private id: number | undefined

  protected constructor(options: CommonDriverOptions) {
    this.name = options.name
    this.body = options.body
    this.type = options.type
  }

  /**
   * Start delivering the message
   * Method creates new message in the DB with the status CREATED
   * and handles all errors
   */
  async run(): Promise<number> {
    await this.change(Status.CREATED)
    this.start().catch((_error) => this.change(Status.ERROR))
    return this.id!
  }

  /**
   * Common method for all heirs to implement
   * Starts the delivery of the message
   */
  abstract start(): Promise<void>

  /**
   * Change the message status.
   * Also creates user or message if they don't exist
   * @param status
   */
  async change(status: Status): Promise<void> {
    const db = await dbConnect()
    await db('users')
      .insert({
        name: this.name,
      })
      .onConflict('name')
      .merge()
    const user = await db('users').where({ name: this.name }).first('id')
    if (!this.id) {
      ;[this.id] = await db('messages').insert(
        {
          body: this.body,
          type: this.type,
          user: user.id,
        },
        'id',
      )
    }
    await db('history').insert({
      status,
      message: this.id,
    })
  }

  static async getUser(name: string): Promise<any> {
    const db = await dbConnect()
    return db('users').where({ name }).first()
  }

  static async getUsers(): Promise<any> {
    const db = await dbConnect()
    return db('users').select()
  }

  /**
   * Get the message information with all status changes
   * This method explicitly gets the history of the statuses for the speed-up
   * @param id
   */
  static async getMessage(id: number | string): Promise<any> {
    const db = await dbConnect()
    const result = await db('messages')
      .where({
        id,
      })
      .leftJoin('history', 'history.message', 'messages.id')
    return result.reduce(
      (prev, curr) => ({
        id: curr.id,
        type: curr.type,
        body: curr.body,
        history: [
          { status: curr.status, date: new Date(curr.date).toISOString() },
          ...prev.history,
        ],
      }),
      { history: [] },
    )
  }

  static async getMessages(): Promise<any> {
    const db = await dbConnect()
    return db('messages').select()
  }

  static async getMessagesByUser(name: string): Promise<any> {
    const db = await dbConnect()
    const result = await db('users')
      .where({
        name,
      })
      .leftJoin('messages', 'users.id', 'messages.user')
    return result
  }

  static async getHistory(message: number | string): Promise<any> {
    const db = await dbConnect()
    const result = await db('history').where({
      message,
    })
    return result.map((history) => ({
      ...history,
      date: new Date(history.date).toISOString(),
    }))
  }
}

export default Driver
