const mockFunction = jest.fn()

export default {
  createTransport: () => ({
    sendMail: mockFunction,
  }),
}
