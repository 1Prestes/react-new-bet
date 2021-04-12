import React from 'react'
import styled from 'styled-components'

const HtmlFooter = styled.footer`
  border-top: 2px solid #ebebeb;
  left: 0;
  bottom: 0;
  padding: 30px 0;
  width: 100%;
  text-align: center;
  font-size: 0.9375em;
  font-style: normal;
`

function Footer (): React.ReactElement {
  return (
    <HtmlFooter>Copyright {new Date().getFullYear()} Luby Software</HtmlFooter>
  )
}

export default Footer
