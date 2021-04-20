import React from 'react'

import { Paragraph } from '../Typography'
import { HtmlFooter } from './Footer'

function Footer (): React.ReactElement {
  return (
    <HtmlFooter>
      <Paragraph fontSize='0.9375em'>
        Copyright {new Date().getFullYear()} Luby Software
      </Paragraph>
    </HtmlFooter>
  )
}

export default Footer
