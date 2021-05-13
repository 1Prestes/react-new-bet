import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import { IconContext } from 'react-icons'
import * as yup from 'yup'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import Input from '../../Components/Input'
import Form from '../../Components/Form/'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import { TitleSM, SubTitle, OutlineButton, Button } from '../../Components'
import Navbar from '../../Components/NavBar'
import { fetchUser, updateUser } from '../../store/userReducer'
import { getCookie, showMessage } from '../../Helpers'
import { ErrorContainer } from './Account'

const Account = (): JSX.Element => {
  const [loading, setLoading] = useState(false)

  const [userUpdate, setUserUpdate] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const user = useAppSelector(state => state.user.user)
  const error = useAppSelector(state => state.user.error)
  const token = getCookie('@AUTH_TOKEN')
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchUser(token)).then(res => {
      if (!res.payload) {
        if (error) {
          showMessage('error', error)
        }
      }
    })
  }, [])

  useEffect(() => {
    setUserUpdate({ ...userUpdate, username: user.username, email: user.email })
  }, [user])

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup
      .string()
      .email()
      .required(),
    username: yup
      .string()
      .min(3)
      .required('')
  })

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    await schema
      .validate(userUpdate)
      .then(res => {
        dispatch(updateUser(res))
          .then(response => {
            if (response.payload === undefined) {
              return showMessage('error', 'Email already exists')
            }

            showMessage(
              'success',
              'Successfully changed data, you will be redirected in 3 seconds',
              3000
            )
            setTimeout(() => {
              history.push('/home')
            }, 3000)
          })
          .catch(err => showMessage('error', err.error.message))
      })
      .catch(err => showMessage('error', err.errors[0]))
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement
    setUserUpdate({ ...userUpdate, [target.name]: target.value })
  }

  const reconnect = (): void => {
    setLoading(true)
    dispatch(fetchUser(token)).then(res => {
      setTimeout(() => {
        if (!res.payload) {
          return setLoading(false)
        }
      }, 1000)
    })
  }

  return (
    <>
      <Navbar linkToHome={true} />
      <AuthenticationFormContainer>
        <IconContext.Provider value={{ style: { padding: '0 19px' } }}>
          {error && (
            <ErrorContainer>
              <SubTitle fontSize='1.5em' margin='auto 35px auto 0'>
                Error connecting to the server,{' '}
                <Button
                  margin='10px auto'
                  padding='5px 15px'
                  backgroundColor='#ffc107'
                  onClick={reconnect}
                >
                  {!loading && 'try again'}
                  {loading && 'carregando...'}
                </Button>
              </SubTitle>
            </ErrorContainer>
          )}
          {!error && (
            <TitleSM margin='26px auto'>Hello {user.username}</TitleSM>
          )}

          {!error && (
            <Form>
              <Input
                changed={event => handleChange(event)}
                type='text'
                placeholder='Username'
                name='username'
                value={userUpdate.username}
              />
              <Input
                changed={event => handleChange(event)}
                type='email'
                placeholder='Email'
                name='email'
                value={userUpdate.email}
              />
              <Input
                changed={event => handleChange(event)}
                type='password'
                placeholder='Password'
                name='password'
                value={userUpdate.password}
              />

              <Input
                changed={event => handleChange(event)}
                type='password'
                placeholder='Password confirmation'
                name='password_confirmation'
                value={userUpdate.password_confirmation}
              />

              <OutlineButton
                onClick={handleClick}
                color='#b5C401'
                fontSize='2.1875em'
                margin='17px auto'
              >
                Update <IoMdArrowForward />
              </OutlineButton>
            </Form>
          )}

          <OutlineButton color='#707070' fontSize='2.1875em' margin='30px'>
            <Link to='/home'>
              <IoMdArrowBack /> Back to Home
            </Link>
          </OutlineButton>
        </IconContext.Provider>
      </AuthenticationFormContainer>
    </>
  )
}

export default Account
