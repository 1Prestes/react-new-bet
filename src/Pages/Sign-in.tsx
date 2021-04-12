import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { TitleMD, TitleXL } from '../Components/typography'
import { Button } from '../Components/buttons'
import Login from '../Components/Login'
// import Footer from '../Components/Footer'
import { Route, Redirect } from 'react-router-dom'
import ResetPassword from '../Components/ResetPassword'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 100vh;

  @media (max-width: 699px) {
    margin-top: 100px;
  }
`

const AuthenticationContainer = styled.div`
  text-align: center;
  width: min-content;
  margin: auto 20px;
`

const SignIn: React.FC = () => {
  const [isAuth, setIsAuth] = useState(Boolean)

  useEffect(() => {
    setIsAuth(false)
  }, [])

  return (
    <>
      <Container>
        <AuthenticationContainer>
          <TitleMD>The Greatest App</TitleMD>
          <Button
            backgroundColor='#B5C401'
            width='144px'
            height='39px'
            margin='30px auto'
          >
            for
          </Button>
          <TitleXL>Lottery</TitleXL>
        </AuthenticationContainer>

        {!isAuth && <Redirect to='/authentication/login' />}
        {!isAuth && (
          <Route path='/authentication/login' render={() => <Login />} />
        )}
        <Route
          path='/authentication/recover-password'
          render={() => <ResetPassword />}
        />
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export default SignIn