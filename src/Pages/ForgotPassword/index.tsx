import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { forgotPassword } from '../../store/recoverPassword'
import Form from '../../Components/Form'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import Input from '../../Components/Input'
import { TitleSM, OutlineButton } from '../../Components'
import { showMessage } from '../../Helpers/toast'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState({ email: '' })
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.password.error)
  const history = useHistory()

  useEffect(() => {
    if (error) {
      showMessage('error', error)
    }
  }, [error])

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

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    await schema
      .validate(email)
      .then(() => {
        const data = {
          email: email.email,
          redirect_url: 'http://localhost:3000/authentication/reset-password/'
        }
        dispatch(forgotPassword(data))
          .then(res => {
            console.log(res)
            if (res.payload === undefined) {
              return
            }
            showMessage('success', 'Success, check your inbox', 2000)
            setTimeout(() => {
              history.push('/authentication/login')
            }, 2000)
          })
          .catch(err => console.log(err))
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

export default ForgotPassword
