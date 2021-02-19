import nodemailer from 'nodemailer'
import config from 'config'
import Driver, { DriverOptions, Status, Type } from './Driver'

export default class HTTP extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.LOG, ...options })
  }

  async start() {
    await this.change(Status.PENDING)
    const transporter = nodemailer.createTransport(
      config.get('drivers.smtp.transport'),
    )

    await transporter.sendMail({
      from: config.get('drivers.smtp.from'),
      to: config.get('drivers.smtp.to'),
      subject: this.body,
      text: this.body,
    })
    await this.change(Status.FINISHED)
  }
}
