import GenerateToken from './generate-jwt'
import { setCookie } from './storageCookie'

interface Login {
  login: {
    email: string
    password: string
  }
  users: [User]
}

interface User {
  id: string
  name: string
  email: string
  password: string
}

const createSession = (payload: Login): void => {
  const user = payload.users.filter((user) => user.email === payload.login.email)
  if (user.length === 0) return

  if (btoa(payload.login.password) === user[0].password) {
    const { id, name, email } = user[0]
    const userAuth = { id, name, email }
    setCookie('@USER_TOKEN_AUTH', GenerateToken(userAuth))
  }
}

export default createSession
