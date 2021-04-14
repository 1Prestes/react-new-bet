import jwt from 'jsonwebtoken'

const GenerateToken = (login: object): string => {
  const token = jwt.sign({ login }, 'REACT_APP_SECRET_JWT', {
    expiresIn: '1h'
  })
  return token
}

export default GenerateToken
