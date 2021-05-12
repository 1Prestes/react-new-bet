import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'

import Login from '../SignIn'
import SignUp from '../SignUp'
import ForgotPassword from '../ForgotPassword'
import ResetPassword from '../ResetPassword'
import { TitleMD, TitleXL, Button } from '../../Components'
import { Container, AuthenticationContainer } from './Authentication'
import { getCookie } from '../../Helpers'

const Authentication: React.FC = () => {
  const token = getCookie('@AUTH_TOKEN')
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

        {<Route path='/authentication/login' render={() => <Login />} />}
        <Route path='/authentication/sign-up' render={() => <SignUp />} />
        <Route
          path='/authentication/forgot-password'
          render={() => <ForgotPassword />}
        />
        <Route
          path='/authentication/reset-password'
          render={() => <ResetPassword />}
        />
      </Container>
    </>
  )
}

export default Authentication
