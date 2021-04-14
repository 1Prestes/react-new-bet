interface User {
  name: string
  email: string
  password: string
}

export default function createNewUser (payload: User): any {
  const { name, email, password } = payload
  const id = btoa(String(Date.now()))

  return {
    id,
    name,
    email,
    password: btoa(password)
  }
}
