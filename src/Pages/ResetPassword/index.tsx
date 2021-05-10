import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import { IconContext } from 'react-icons'
import * as yup from 'yup'

// import { REGISTER_USER } from '../../store/userReducer'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { createUser } from '../../store/userReducer'
import { setAuth } from '../../store/sessionReducer'
import Input from '../../Components/Input'
import Form from '../../Components/Form'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import { TitleSM, OutlineButton } from '../../Components'
import { showMessage } from '../../Helpers'

const ResetPassword: React.FC = () => {
  const [resetPassword, setResetPassword] = useState({
    username: '',
    email: '',
    password: ''
  })
  const token = useAppSelector(state => state.session.token)
  const currentUser = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    if (token) history.push('/')
    if (currentUser.error) showMessage('error', currentUser.error)
  }, [currentUser])

  const schema = yup.object().shape({
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    password: yup
      .string()
      .min(6)
      .required()
  })

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    await schema
      .validate(resetPassword)
      .then(res => {
        dispatch(createUser(res)).then(() => {
          const { email, password } = res
          dispatch(setAuth({ email, password }))
        })
      })
      .catch(err => showMessage('error', err.errors[0]))
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement
    setResetPassword({ ...resetPassword, [target.name]: target.value })
  }

  return (
    <AuthenticationFormContainer>
      <IconContext.Provider value={{ style: { padding: '0 19px' } }}>
        <TitleSM margin='26px auto'>Registration</TitleSM>

        <Form>
          <Input
            changed={event => handleChange(event)}
            type='password'
            placeholder='Password'
            name='password'
            value={resetPassword.password}
          />

          <Input
            changed={event => handleChange(event)}
            type='password_confirmation'
            placeholder='Password confirmation'
            name='password'
            value={resetPassword.password}
          />

          <OutlineButton
            onClick={handleClick}
            color='#b5C401'
            fontSize='2.1875em'
            margin='17px auto'
          >
            Reset Password <IoMdArrowForward />
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
