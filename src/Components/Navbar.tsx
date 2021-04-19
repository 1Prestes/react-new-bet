import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { useAppDispatch } from '../store/hooks'
import { LOGOUT_USER } from '../store/userReducer'

interface LinkToHome {
  linkToHome?: boolean
}

interface Menu {
  isOpen?: boolean
}

const Header = styled.header`
  @media (min-width: 678px) {
    border-bottom: 2px solid #ebebeb;
  }
`

const HtmlNavbar = styled.nav<Menu>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  position: fixed;
  top: 0;
  margin-bottom: -14px;
  font-style: italic;
  font-weight: 700;
  font-size: 1.25em;

  div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      background-color: #fff;
      width: 100%;
      transition: transform 0.3s ease-out;
      transform: translateX(${props => (props.isOpen ? 0 : '-100%')});
    }
  }

  @media (min-width: 678px) {
    justify-content: space-around;
    position: initial;

    div {
      flex-direction: row;

      ul {
        flex-direction: row;
        display: inherit;
        background-color: transparent;
        transform: translateX(0);
      }
    }
  }
`

const MenuContainer = styled.div`
  width: 100%;
  padding-top: 15px;
  padding-left: 30px;
  border-bottom: 2px solid #ebebeb;
  background-color: #fff;

  @media (min-width: 678px) {
    width: auto;
    border-bottom: none;
    background-color: transparent;
  }
`

const MenuItemsContainer = styled.div`
  width: 100%;

  ul {
    padding: 20px 0;
    border-bottom: 1px solid #cfcfcf;
    div {
      display: flex;
      border-bottom: none;
      flex-direction: column;
      align-items: baseline;
      li {
        padding: 5px 0;
        a {
          border-bottom: 1px solid #cfcfcf;
        }
      }
    }
  }

  @media (min-width: 678px) {
    width: 80%;
    padding: initial;

    ul {
      padding: 20px 0;
      border-bottom: none;
      div {
        flex-direction: row;
        li {
          padding: 5px 0;
          a {
            border-bottom: none;
          }
        }
      }
    }
  }
`

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-direction: column;
  margin-bottom: -15px;

  h1 {
    font-size: 2.75em;
  }

  hr {
    width: 100%;
    border: none;
    border-radius: 6px 6px 6px 6px;
    border-bottom: yellowgreen 7px solid;
  }

  @media (min-width: 678px) {
    margin-bottom: auto;
  }
`

const NavItem = styled.li`
  a {
    display: inline-flex;
    margin: 0 40px;
    color: var(--text-color-primary);
  }
`

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
