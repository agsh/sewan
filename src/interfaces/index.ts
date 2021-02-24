export enum Type {
  LOG = 'LOG',
  HTTP = 'HTTP',
  EMAIL = 'EMAIL',
}

export enum Status {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export interface History {
  status: Status
  date: string
  message: number
}

export interface Message {
  id: number
  body: string
  type: Type
  history: History[]
  user: number
}

export interface User {
  name: string
  messages: Array<Message>
}
