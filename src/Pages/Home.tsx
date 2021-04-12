import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Home: React.FC = () => {
  const [isAuth, setIsAuth] = useState(Boolean)
  useEffect(() => {
    setIsAuth(false)
  }, [])

  return (
    <>
      <h1>Home</h1>
      {!isAuth && <Redirect to='/authentication' />}
    </>
  )
}

export default Home
