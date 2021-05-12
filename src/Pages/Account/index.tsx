import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import { IconContext } from 'react-icons'
import * as yup from 'yup'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import Input from '../../Components/Input'
import Form from '../../Components/Form/'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import { TitleSM, OutlineButton } from '../../Components'
import Navbar from '../../Components/NavBar'
import { fetchUser, updateUser } from '../../store/userReducer'
import { getCookie, showMessage } from '../../Helpers'

const Account = (): JSX.Element => {
  const [userUpdate, setUserUpdate] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const user = useAppSelector(state => state.user.user)
  const token = getCookie('@AUTH_TOKEN')
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchUser(token))
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

  return (
    <>
      <Navbar linkToHome={true} />
      <AuthenticationFormContainer>
        <IconContext.Provider value={{ style: { padding: '0 19px' } }}>
          <TitleSM margin='26px auto'>Hello {user.username}</TitleSM>

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
