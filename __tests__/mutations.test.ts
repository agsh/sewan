import request from 'supertest'
import axios from 'axios'
import nodemailer from 'nodemailer'
import app, { server } from '../src/app'

afterAll(() => {
  server.close()
})

describe('send test', () => {
  it('should runs properly for LOG driver', async () => {
    console.log = jest.fn()
    const result = await request(app)
      .post('/graphql')
      .send({
        query: 'mutation { send(user: "a", type: "LOG", body: "a") }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body.data.send).toStrictEqual('1')
    expect(console.log).toBeCalled()
  })

  it('should runs properly for HTTP driver', async () => {
    console.log = jest.fn()
    const result = await request(app)
      .post('/graphql')
      .send({
        query: 'mutation { send(user: "a", type: "HTTP", body: "a") }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body.data.send).toStrictEqual('1')
    expect(axios.post).toBeCalledTimes(1)
  })

  it('should runs properly for SMTP driver', async () => {
    console.log = jest.fn()
    const result = await request(app)
      .post('/graphql')
      .send({
        query: 'mutation { send(user: "a", type: "SMTP", body: "a") }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body.data.send).toStrictEqual('1')
    expect(nodemailer.createTransport().sendMail).toBeCalledTimes(1)
  })
})
