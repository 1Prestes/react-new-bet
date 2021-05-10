import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
// import { AUTH_USER } from '../../store/userReducer'
import Form from '../../Components/Form/'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import Input from '../../Components/Input'
import { TitleSM, OutlineButton } from '../../Components'
import { showMessage } from '../../Helpers'
import { ForgetPasswordParagraph } from './SignIn'
import { setAuth } from '../../store/sessionReducer'

const Login: React.FC = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  // const currentUser = useAppSelector(state => state.user)
  const session = useAppSelector(state => state.session)
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (session.token) history.push('/')
    if (session.error) showMessage('error', session.error)
  }, [session])

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
      .then((res: any) => {
        dispatch(setAuth(res))
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
            <Link to='/authentication/forgot-password'>
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
