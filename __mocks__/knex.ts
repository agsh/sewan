const messageDB = [
  {
    id: 1,
    type: 'LOG',
    body: 'a',
    status: 'PENDING',
    date: 2020,
    user: 1,
  },
  {
    id: 1,
    type: 'LOG',
    body: 'a',
    status: 'FINISHED',
    date: 2021,
    user: 1,
  },
]

const messagesDB = [
  {
    id: 1,
    type: 'LOG',
    body: 'a',
    user: 1,
  },
  {
    id: 2,
    type: 'HTTP',
    body: 'a',
    user: 1,
  },
]

const historyDB = [
  {
    status: 'PENDING',
    date: 2020,
  },
  {
    status: 'FINISHED',
    date: 2021,
  },
]

const userDB = {
  name: 'a',
  id: 1,
}

export default (_config: any) => (table: any) => {
  return {
    where: (query: any) => {
      switch (table) {
        case 'messages':
          return {
            leftJoin: (join: any) => {
              console.log(table)
              console.log(query)
              console.log(join)
              console.log('?')
              switch (table) {
                case 'messages':
                  return messageDB
                default:
                  return []
              }
            },
          }
        case 'history':
          return historyDB
        case 'users':
          return {
            first: () => userDB,
            leftJoin: () => messagesDB,
          }
        default:
          return []
      }
    },
    select: (query: any) => {
      console.log(query)
      return messagesDB
    },
  }
}
