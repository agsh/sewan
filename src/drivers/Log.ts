import Driver, { DriverOptions, Status, Type } from './Driver'

export default class Log extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.LOG, ...options })
  }

  async start() {
    await this.change(Status.PENDING)
    console.log(this.body)
    await this.change(Status.FINISHED)
  }
}