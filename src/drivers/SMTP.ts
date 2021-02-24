import nodemailer from 'nodemailer'
import config from 'config'
import { Driver, DriverOptions, Status, Type } from './Driver'

/**
 * Send the message to the e-mail
 * SMTP credentials and e-mail boxes described in the `drivers.smtp` config
 * @example
 * ```graphql
 * mutation {
 *   send(user: "user", type: "SMTP", body: "e-mail")
 * }
 * ```
 * @example
 * ```graphql
 * mutation {
 *   send(user: "user", type: "EMAIL", body: "e-mail")
 * }
 * ```
 */
export class SMTP extends Driver {
  constructor(options: DriverOptions) {
    super({ type: Type.EMAIL, ...options })
  }

  async start(): Promise<void> {
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

export default SMTP
