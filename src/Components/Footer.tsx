import React from 'react'
import styled from 'styled-components'

const HtmlFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  border-top: 2px solid #ebebeb;
  font-size: 0.9375em;
  padding: 30px 0;
  font-style: normal;
`

function Footer (): React.ReactElement {
  return (
    <HtmlFooter>Copyright {new Date().getFullYear()} Luby Software</HtmlFooter>
  )
}

export default Footer
