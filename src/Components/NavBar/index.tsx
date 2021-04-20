import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { useAppDispatch } from '../../store/hooks'
import { LOGOUT_USER } from '../../store/userReducer'
import {
  Header,
  HtmlNavbar,
  MenuItemsContainer,
  Logo,
  MenuContainer,
  NavItem
} from './NavBar'

interface LinkToHome {
  linkToHome?: boolean
}

const Navbar = ({ linkToHome }: LinkToHome): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const logout = (): void => {
    dispatch(LOGOUT_USER())
  }

  const handleClick = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <Header>
      <HtmlNavbar isOpen={isOpen}>
        <MenuContainer>
          <Logo onClick={handleClick}>
            <h1>TGL</h1>
            <hr />
          </Logo>
        </MenuContainer>
        <MenuItemsContainer>
          <ul>
            <div>
              {linkToHome && (
                <NavItem>
                  <Link to='/'>Home</Link>
                </NavItem>
              )}
            </div>
            <div>
              <NavItem>
                <Link to='/'>Account</Link>
              </NavItem>
              <IconContext.Provider value={{ style: { paddingLeft: '20px' } }}>
                <NavItem onClick={logout}>
                  <Link to='/'>
                    Log out <IoMdArrowForward />
                  </Link>
                </NavItem>
              </IconContext.Provider>
            </div>
          </ul>
        </MenuItemsContainer>
      </HtmlNavbar>
    </Header>
  )
}

export default Navbar
