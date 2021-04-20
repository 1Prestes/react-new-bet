import React from 'react'

import { HtmlForm } from './Form'

interface IChildren {
  children: React.ReactNode
}

const Form: React.FC<IChildren> = ({ children }) => (
  <HtmlForm>{children}</HtmlForm>
)

export default Form
