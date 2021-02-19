import request from 'supertest'
import app, { server } from '../src/app'

afterAll(() => {
  server.close()
})

describe('message test', () => {
  it('should return proper value for the query', async () => {
    const result = await request(app)
      .post('/graphql')
      .send({
        query: '{ message(id:"1") { id, type } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body.data.message).toStrictEqual({ id: '1', type: 'LOG' })
  })

  it('should return proper value for the query with history subtype includes', async () => {
    const result = await request(app)
      .post('/graphql')
      .send({
        query: '{ message(id:"1") { id, type, history { status } } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body.data.message).toStrictEqual({
      id: '1',
      type: 'LOG',
      history: [{ status: 'PENDING' }, { status: 'FINISHED' }],
    })
  })

  it('should fail with the wrong query', async () => {
    await request(app)
      .post('/graphql')
      .send({
        query: '{ message(id:"1") { id, type, history } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })
})

describe('messages test', () => {
  it('should return proper value for the query', async () => {
    const result = await request(app)
      .post('/graphql')
      .send({
        query: '{ messages { id, type } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body.data.messages).toStrictEqual([
      { id: '1', type: 'LOG' },
      { id: '2', type: 'HTTP' },
    ])
  })

  it('should fail with the wrong query', async () => {
    await request(app)
      .post('/graphql')
      .send({
        query: '{ messages(id:"1") { id, type, history } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })
})

describe('user test', () => {
  it('should return proper value for the query', async () => {
    const result = await request(app)
      .post('/graphql')
      .send({
        query: '{ user(name: "a") { name, messages { type } } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body.data.user).toStrictEqual({
      name: 'a',
      messages: [
        {
          type: 'LOG',
        },
        {
          type: 'HTTP',
        },
      ],
    })
  })
})
