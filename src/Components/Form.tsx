import React from 'react'

import styled from 'styled-components'

interface IChildren {
  children: React.ReactNode
}

export const AuthenticationFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 20px;
  text-align: center;

  @media (max-width: 699px) {
    margin: 80px auto;
  }
`

const HtmlForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 350px;
  padding: 10px 0;
  box-shadow: 0px 3px 25px #00000014;
  border: 1px solid #ddd;
  border-radius: 14px;

  @media (max-width: 360px) {
    width: 100%;
  }
`

const Form: React.FC<IChildren> = ({ children }) => (
  <HtmlForm>{children}</HtmlForm>
)

export default Form
