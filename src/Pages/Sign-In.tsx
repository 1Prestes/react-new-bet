import React, { useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useAppSelector } from '../store/hooks'
import Login from '../Components/Login'
import SignUp from '../Components/Sign-Up'
import ResetPassword from '../Components/ResetPassword'
import { TitleMD, TitleXL, Button } from '../Components'

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
  const token = useAppSelector(state => state.user.token)
  const history = useHistory()

  useEffect(() => {
    if (token) history.push('/')
  }, [token])

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

        {!token && <Redirect to='/authentication/login' />}
        {!token && (
          <Route path='/authentication/login' render={() => <Login />} />
        )}
        <Route
          path='/authentication/recover-password'
          render={() => <ResetPassword />}
        />
        <Route path='/authentication/sign-up' render={() => <SignUp />} />
      </Container>
    </>
  )
}

export default SignIn
