import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import * as yup from 'yup'

import Form, { AuthenticationFormContainer } from './Form'
import Input from './Input'
import { TitleSM } from './typography'
import { OutlineButton } from './buttons'
import { showMessage } from '../Services/toast'

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState({ email: '' })
  const history = useHistory()

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required()
  })

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement
    setEmail({ email: target.value })
  }

  const handleClick = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    schema
      .validate(email)
      .then(() => {
        showMessage('success', 'Success, check your inbox', 2000)
        setTimeout(() => {
          history.push('/authentication/login')
        }, 2000)
      })
      .catch(err => showMessage('error', err.errors[0]))
  }

  return (
    <AuthenticationFormContainer>
      <IconContext.Provider value={{ style: { padding: '0 19px' } }}>
        <TitleSM margin='26px auto'>Reset password</TitleSM>
        <Form>
          <Input
            changed={handleChange}
            type='email'
            value={email.email}
            placeholder='Email'
          />
          <OutlineButton
            onClick={handleClick}
            color='#b5C401'
            fontSize='2.1875em'
            margin='17px auto'
          >
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
