import GenerateToken from './generate-jwt'

interface Payload {
  name: string
  email: string
  password: string
}

interface User extends Payload {
  id: string
}

const db: User[] = []

export function findUser (email: string): User | undefined {
  return db.find(user => {
    return user.email === email
  })
}

export function createUser (payload: Payload): User | string {
  if (findUser(payload.email)) return 'E-mail exists'

  const { name, email, password } = payload
  const id = btoa(String(Date.now()))
  const user: User = { id, name, email, password: btoa(password) }

  db.push(user)

  return user
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
