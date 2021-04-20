import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import { IconContext } from 'react-icons'
import * as yup from 'yup'

import { REGISTER_USER } from '../store/userReducer'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import Input from './Input'
import Form, { AuthenticationFormContainer } from './Form'
import { TitleSM, OutlineButton } from './'
import { showMessage } from '../Services'

const SignUp: React.FC = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
  const currentUser = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const history = useHistory()

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
      .required(),
    name: yup
      .string()
      .min(3)
      .required('')
  })

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    await schema
      .validate(newUser)
      .then(res => dispatch(REGISTER_USER(res)))
      .catch(err => showMessage('error', err.errors[0]))
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement
    setNewUser({ ...newUser, [target.name]: target.value })
  }

  return (
    <AuthenticationFormContainer>
      <IconContext.Provider value={{ style: { padding: '0 19px' } }}>
        <TitleSM margin='26px auto'>Registration</TitleSM>

        <Form>
          <Input
            changed={event => handleChange(event)}
            type='text'
            placeholder='Name'
            name='name'
            value={newUser.name}
          />
          <Input
            changed={event => handleChange(event)}
            type='email'
            placeholder='Email'
            name='email'
            value={newUser.email}
          />
          <Input
            changed={event => handleChange(event)}
            type='password'
            placeholder='Password'
            name='password'
            value={newUser.password}
          />

          <OutlineButton
            onClick={handleClick}
            color='#b5C401'
            fontSize='2.1875em'
            margin='17px auto'
          >
            Register <IoMdArrowForward />
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

export default SignUp
