import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

const Header = styled.header`
  border-bottom: 2px solid #ebebeb;
`

const HtmlNavbar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: -14px;
  font-style: italic;
  font-weight: 700;
  font-size: 1.25em;

  div {
    display: flex;
    align-items: center;

    ul {
      display: flex;
    }
  }
`
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2.75em;
  }

  hr {
    width: 100%;
    border: none;
    border-radius: 6px 6px 6px 6px;
    border-bottom: yellowgreen 7px solid;
  }
`

const NavLink = styled.a`
  display: inline-flex;
  margin: 0 40px;
  color: var(--text-color-primary);
`

const Navbar: React.FC = () => {
  return (
    <Header>
      <HtmlNavbar>
        <div>
          <Logo>
            <h1 className='title'>TGL</h1>
            <hr />
          </Logo>
          {/* <ul>
            <li>
              <NavLink href='/'>Home</NavLink>
            </li>
          </ul> */}
        </div>
        <div>
          <ul>
            <li>
              <NavLink href='/'>Account</NavLink>
            </li>
            <IconContext.Provider value={{ style: { paddingLeft: '20px' } }}>
              <li>
                <NavLink href='/'>
                  Log out <IoMdArrowForward />
                </NavLink>
              </li>
            </IconContext.Provider>
          </ul>
        </div>
      </HtmlNavbar>
    </Header>
  )
}

export default Navbar
