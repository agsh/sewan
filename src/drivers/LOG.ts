import { Driver, DriverOptions } from './Driver'
import { Status, Type } from '../interfaces'

/**
 * Write the message to the stdout
 * @example
 * ```graphql
 * mutation {
 *   send(user: "user", type: "LOG", body: "log in the console")
 * }
 * ```
 */
export class LOG extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.LOG, ...options })
  }

  async start(): Promise<void> {
    await this.change(Status.PENDING)
    console.log(this.body)
    await this.change(Status.FINISHED)
  }
}

export default LOG
