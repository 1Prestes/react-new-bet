import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import { IconContext } from 'react-icons'
import * as yup from 'yup'

// import { REGISTER_USER } from '../../store/userReducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { resetPassword } from '../../store/recoverPassword'
import Input from '../../Components/Input'
import Form from '../../Components/Form'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import { TitleSM, OutlineButton } from '../../Components'
import { showMessage } from '../../Helpers'

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState({
    password: '',
    password_confirmation: ''
  })
  const errorPassword = useAppSelector(state => state.password.error)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    await schema
      .validate(password)
      .then(() => {
        const [, token] = history.location.search.split('=')
        const data = {
          token,
          password: password.password,
          password_confirmation: password.password_confirmation
        }

        dispatch(resetPassword(data))
          .then(response => {
            if (response.payload === undefined) {
              return showMessage('error', 'Invalid token')
            }
            showMessage(
              'success',
              'Reset password successfully, you will be redirected in 3 seconds',
              2000
            )
            setTimeout(() => {
              history.push('/authentication/login')
            }, 3000)
          })
          .catch(() => showMessage('error', errorPassword))
      })
      .catch(err => showMessage('error', err.errors[0]))
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement
    setPassword({ ...password, [target.name]: target.value })
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
            value={password.password}
          />

          <Input
            changed={event => handleChange(event)}
            type='password'
            placeholder='Password confirmation'
            name='password_confirmation'
            value={password.password_confirmation}
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
