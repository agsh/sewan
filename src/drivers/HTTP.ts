import axios from 'axios'
import config from 'config'
import { Driver, DriverOptions } from './Driver'
import { Status, Type } from '../interfaces'

/**
 * Deliver the message to the HTTP endpoint through the POST request
 * Url of the endpoint described in the `drivers.http.url` config
 * @example
 * ```graphql
 * mutation {
 *   send(user: "user", type: "HTTP", body: "post body")
 * }
 * ```
 */
export class HTTP extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.HTTP, ...options })
  }

  async start(): Promise<void> {
    await this.change(Status.PENDING)
    await axios.post(config.get('drivers.http.url'), this.body)
    await this.change(Status.FINISHED)
  }
}

export default HTTP
