import React from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'

import Form, { AuthenticationFormContainer } from './Form'
import Input from './Input'
import { TitleSM } from './typography'
import { OutlineButton } from './buttons'

const ResetPassword: React.FC = () => {
  return (
    <AuthenticationFormContainer>
      <IconContext.Provider value={{ style: { padding: '0 19px' } }}>
        <TitleSM margin="26px auto">Reset password</TitleSM>
        <Form>
          <Input type='text' placeholder='Email' />
          <OutlineButton color='#b5C401' fontSize='2.1875em' margin='17px auto'>
            Send link <IoMdArrowForward />
          </OutlineButton>
        </Form>
        <OutlineButton color='#707070' fontSize='2.1875em' margin='30px'>
          <Link to='/authentication/login'>
            <IoMdArrowBack /> Back
          </Link>
        </OutlineButton>
      </IconContext.Provider>
    </AuthenticationFormContainer>
  )
}

export default ResetPassword
