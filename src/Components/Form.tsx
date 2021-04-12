import React from 'react'

import styled from 'styled-components'

interface IChildren {
  children: React.ReactNode
}

const HtmlForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 350px;
  padding: 10px 0;
  box-shadow: 0px 3px 25px #00000014;
  border: 1px solid #ddd;
  border-radius: 14px;
`

const Form: React.FC<IChildren> = ({ children }) => (
  <HtmlForm>{children}</HtmlForm>
)

export default Form
