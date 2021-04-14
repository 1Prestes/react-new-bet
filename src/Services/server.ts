interface Payload {
  name: string
  email: string
  password: string
}

interface User extends Payload {
  id: string
}

const db: User[] = []

export function createUser (payload: Payload): User | string {
  const { name, email, password } = payload
  const id = btoa(String(Date.now()))

  const user: User = {
    id,
    name,
    email,
    password: btoa(password)
  }

  const emailExists = db.find(user => {
    return user.email === payload.email
  })

  if (emailExists) return 'E-mail exists'

  db.push(user)

  return user
}
