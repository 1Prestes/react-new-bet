import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Form from '../../Components/Form/'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import Input from '../../Components/Input'
import { TitleSM, OutlineButton } from '../../Components'
import { getCookie, showMessage } from '../../Helpers'
import { ForgetPasswordParagraph } from './SignIn'
import { CLEAR_SESSION, setAuth } from '../../store/sessionReducer'

interface ILogin {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [login, setLogin] = useState({ email: '', password: '' })
  const session = useAppSelector(state => state.session)
  const token = getCookie('@AUTH_TOKEN')
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) history.push('/')
    if (session.error) {
      showMessage('error', session.error)
      dispatch(CLEAR_SESSION())
    }
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
    setLogin({ ...login, [target.name]: target.value })
  }

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()
    schema
      .validate(login)
      .then((res: ILogin) => {
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
            value={login.email}
          />
          <Input
            changed={handleChange}
            name='password'
            type='password'
            placeholder='Password'
            value={login.password}
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
