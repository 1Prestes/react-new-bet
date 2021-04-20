import React from 'react'
import styled from 'styled-components'
import { Paragraph } from './typography'

const HtmlFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  padding: 30px 0;
  border-top: 2px solid #ebebeb;
`

function Footer (): React.ReactElement {
  return (
    <HtmlFooter>
      <Paragraph fontSize='0.9375em'>Copyright {new Date().getFullYear()} Luby Software</Paragraph>
    </HtmlFooter>
  )
}

export default Footer
