import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { TitleSM } from '../Components/typography'
import { OutlineButton } from '../Components/buttons'
import Input from './Input'
import Form from './Form'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 20px;
  text-align: center;
`

const ForgetPasswordParagraph = styled.p`
  margin: 27px;
  font-size: 1.0625em;
  text-align: end;
  color: #c1c1c1;
`

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <IconContext.Provider value={{ style: { paddingLeft: '19px' } }}>
        <TitleSM>Authentication</TitleSM>
        <Form>
          <Input type='text' placeholder='Email' />
          <Input type='password' placeholder='Password' />
          <ForgetPasswordParagraph>
            I forget my password
          </ForgetPasswordParagraph>
          <OutlineButton color='#b5C401' fontSize='2.1875em' margin='17px auto'>
            Log In <IoMdArrowForward />
          </OutlineButton>
        </Form>
        <OutlineButton color='#707070' fontSize='2.1875em' margin='30px'>
          Sign Up <IoMdArrowForward />
        </OutlineButton>
      </IconContext.Provider>
    </LoginContainer>
  )
}

export default Login
