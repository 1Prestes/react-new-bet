import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import Form, { AuthenticationFormContainer } from './Form'
import Input from './Input'
import { TitleSM } from '../Components/typography'
import { OutlineButton } from '../Components/buttons'

const ForgetPasswordParagraph = styled.p`
  margin: 27px;
  font-size: 1.0625em;
  text-align: end;
  a {
    color: #c1c1c1;
  }
`

const Login: React.FC = () => {
  return (
    <AuthenticationFormContainer>
      <IconContext.Provider value={{ style: { paddingLeft: '19px' } }}>
        <TitleSM margin='26px auto'>Authentication</TitleSM>
        <Form>
          <Input type='text' placeholder='Email' />
          <Input type='password' placeholder='Password' />
          <ForgetPasswordParagraph>
            <Link to='/authentication/recover-password'>
              I forget my password
            </Link>
          </ForgetPasswordParagraph>
          <OutlineButton color='#b5C401' fontSize='2.1875em' margin='17px auto'>
            Log In <IoMdArrowForward />
          </OutlineButton>
        </Form>
        <OutlineButton color='#707070' fontSize='2.1875em' margin='30px'>
          <Link to='/authentication/sign-up'>
            Sign Up <IoMdArrowForward />
          </Link>
        </OutlineButton>
      </IconContext.Provider>
    </AuthenticationFormContainer>
  )
}

export default Login
