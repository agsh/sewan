import { Driver, DriverOptions, Status, Type } from './Driver'

/**
 * Write the message to the stdout
 * @example
 * ```graphql
 * mutation {
 *   send(user: "user", type: "LOG", body: "log in the console")
 * }
 * ```
 */
export class Log extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.LOG, ...options })
  }

  async start(): Promise<void> {
    await this.change(Status.PENDING)
    console.log(this.body)
    await this.change(Status.FINISHED)
  }
}

export default Log
