import React from 'react'

import { HtmlInput } from './Input'

interface IInput {
  type: string
  placeholder: string
  name?: string
  value?: string
  changed?: (e: React.FormEvent<HTMLInputElement>) => void
}

const Input = ({
  type,
  placeholder,
  name,
  value,
  changed
}: IInput): React.ReactElement => {
  return (
    <HtmlInput
      onChange={changed}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  )
}

export default Input
