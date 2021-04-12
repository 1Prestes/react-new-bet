import React from 'react'
import styled from 'styled-components'

interface IInput {
  type: string
  placeholder: string
}

const HtmlInput = styled.input`
  padding: 34px 30px;
  border: none;
  border-bottom: 2px solid #ebebeb;
  color: #9d9d9d;
  font-size: 1.0625em;
  font-style: italic;
  font-weight: bold;

  &:focus {
    outline: none;
  }
`

const Input = ({ type, placeholder }: IInput): React.ReactElement => {
  return <HtmlInput type={type} placeholder={placeholder} />
}

export default Input
