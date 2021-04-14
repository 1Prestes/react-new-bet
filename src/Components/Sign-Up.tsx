import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import * as yup from 'yup'

import { useAppSelector, useAppDispatch } from '../store/hooks'
import Form, { AuthenticationFormContainer } from './Form'
import Input from './Input'
import { TitleSM } from './typography'
import { OutlineButton } from './buttons'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import { REGISTER_USER } from '../store/registerReducer'

const SignUp: React.FC = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
  const dispatch = useAppDispatch()
  const users = useAppSelector(state => state.registerUser)

  useEffect(() => {
    console.log(users)
  }, [users])

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3)
      .required(''),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(6)
      .required('Please provide a valid password')
  })

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    await schema
      .validate(newUser)
      .then(res => dispatch(REGISTER_USER(res)))
      .catch(err => err.errors)
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
            changed={(event) => handleChange(event)}
            type='email'
            placeholder='Email'
            name='email'
            value={newUser.email}
          />
          <Input
            changed={(event) => handleChange(event)}
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
