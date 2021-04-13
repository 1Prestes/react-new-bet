import jwt from 'jsonwebtoken'

function GenerateToken (email: string): string {
  if (!email) return 'Un'
  const token = jwt.sign({ email }, 'REACT_APP_SECRET_JWT', {
    expiresIn: '1h'
  })
  return token
}

export default GenerateToken
