import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'
import { IconContext } from 'react-icons'

// import { REGISTER_USER } from '../../store/userReducer'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import Input from '../../Components/Input'
import Form from '../../Components/Form/'
import { AuthenticationFormContainer } from '../../Components/Form/Form'
import { TitleSM, OutlineButton } from '../../Components'
import Navbar from '../../Components/NavBar'
import { fetchUser } from '../../store/userReducer'

const Account = (): JSX.Element => {
  const user = useAppSelector(state => state.user.user)
  const token = useAppSelector(state => state.session.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser(token))
  }, [])

  return (
    <>
      <Navbar linkToHome={true} />
      <AuthenticationFormContainer>
        <IconContext.Provider value={{ style: { padding: '0 19px' } }}>
          <TitleSM margin='26px auto'>Hello {user.username}</TitleSM>

          <Form>
            <Input
              // changed={event => handleChange(event)}
              type='text'
              placeholder='Username'
              name='username'
              // value={newUser.username}
            />
            <Input
              // changed={event => handleChange(event)}
              type='email'
              placeholder='Email'
              name='email'
              // value={newUser.email}
            />
            <Input
              // changed={event => handleChange(event)}
              type='password'
              placeholder='Password'
              name='password'
              // value={newUser.password}
            />

            <OutlineButton
              // onClick={handleClick}
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
