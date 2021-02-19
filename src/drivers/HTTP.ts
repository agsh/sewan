import axios from 'axios'
import config from 'config'
import Driver, { DriverOptions, Status, Type } from './Driver'

export default class HTTP extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.LOG, ...options })
  }

  async start(): Promise<void> {
    await this.change(Status.PENDING)
    await axios.post(config.get('drivers.http.url'), this.body)
    await this.change(Status.FINISHED)
  }
}
