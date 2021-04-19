import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { AUTH_USER } from '../store/userReducer'
import Form, { AuthenticationFormContainer } from './Form'
import Input from './Input'
import { TitleSM } from '../Components/typography'
import { OutlineButton } from '../Components/buttons'
import { showMessage } from '../Services/toast'

const ForgetPasswordParagraph = styled.p`
  margin: 27px;
  font-size: 1.0625em;
  text-align: end;
  a {
    color: #c1c1c1;
  }
`

const Login: React.FC = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const currentUser = useAppSelector(state => state.user)
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser.token) history.push('/')
    if (currentUser.error) showMessage('error', currentUser.error)
  }, [currentUser])

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6)
      .required(),
    email: yup
      .string()
      .email()
      .required()
  })

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement
    setUser({ ...user, [target.name]: target.value })
  }

  const handleClick = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    schema
      .validate(user)
      .then(res => {
        dispatch(AUTH_USER({ login: res }))
      })
      .catch(err => showMessage('error', err.errors[0]))
  }

  return (
    <AuthenticationFormContainer>
      <IconContext.Provider value={{ style: { paddingLeft: '19px' } }}>
        <TitleSM margin='26px auto'>Authentication</TitleSM>
        <Form>
          <Input
            changed={handleChange}
            type='email'
            name='email'
            placeholder='Email'
            value={user.email}
          />
          <Input
            changed={handleChange}
            name='password'
            type='password'
            placeholder='Password'
            value={user.password}
          />
          <ForgetPasswordParagraph>
            <Link to='/authentication/recover-password'>
              I forget my password
            </Link>
          </ForgetPasswordParagraph>
          <OutlineButton
            onClick={handleClick}
            color='#b5C401'
            fontSize='2.1875em'
            margin='17px auto'
          >
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
