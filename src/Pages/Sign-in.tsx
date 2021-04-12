import styled from 'styled-components'

import { TitleMD, TitleXL } from '../Components/typography'
import { Button } from '../Components/buttons'
import Login from '../Components/Login'
import Footer from '../Components/Footer'

const AuthenticationContainer = styled.div`
  text-align: center;
  width: min-content;
  margin: auto 20px;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const SignIn = (): JSX.Element => {
  return (
    <>
      <Container>
        <AuthenticationContainer>
          <TitleMD>The Greatest App</TitleMD>
          <Button backgroundColor='#B5C401' width='144px' height='39px'>
            for
          </Button>
          <TitleXL>Lottery</TitleXL>
        </AuthenticationContainer>

        <Login />
      </Container>
      <Footer />
    </>
  )
}

export default SignIn
