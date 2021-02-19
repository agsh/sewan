import axios from 'axios'
import Driver, { DriverOptions, Status, Type } from './Driver'

export default class HTTP extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.LOG, ...options })
  }

  async start() {
    await this.change(Status.PENDING)
    await axios.post('/user', this.body)
    await this.change(Status.FINISHED)
  }
}
