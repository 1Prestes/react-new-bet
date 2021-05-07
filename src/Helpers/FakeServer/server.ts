import GenerateToken from './generate-jwt'

interface Payload {
  name: string
  email: string
  password: string
}

interface User extends Payload {
  id: string
  token?: string
}

const db: User[] = [
  {
    email: 'dijango_ilha@hotmail.com',
    id: 'MTYxODQ0Njg5NTgxNw==',
    name: 'Dijango Alves Rodolfo',
    password: 'MTIzNDU2'
  }
]

export function findUser (email: string): User | undefined {
  return db.find(user => {
    return user.email === email
  })
}

export function createUser (payload: Payload): any {
  if (findUser(payload.email)) return 'E-mail exists'

  const { name, email, password } = payload
  const id = btoa(String(Date.now()))
  const user: User = { id, name, email, password: btoa(password) }

  db.push(user)
  return auth({ id, name, email, password })
}

export function auth (login: User): any {
  const user = findUser(login.email)
  if (!user) return 'Incorrect data'

  const { id, name, email } = user

  if (btoa(login.password) === user.password) {
    const token = GenerateToken({ id, name, email })
    const userAuth = { user: { id, name, email }, token }
    return userAuth
  }
  return 'Incorrect data'
}
