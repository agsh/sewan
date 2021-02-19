import nodemailer from 'nodemailer'
import Driver, { DriverOptions, Status, Type } from './Driver'

export default class HTTP extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.LOG, ...options })
  }

  async start() {
    await this.change(Status.PENDING)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'user',
        pass: 'user',
      },
    })

    await transporter.sendMail({
      from: this.body,
      to: this.body,
      subject: this.body,
      text: this.body,
    })
    await this.change(Status.FINISHED)
  }
}
