import React from 'react'
import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'

import { OutlineButton } from './buttons'
import { Paragraph, Span } from './typography'
import { floatToReal } from '../Services/floatToReal'

interface Item {
  type: string
  price: number
  bet: number[]
  color: string
}

interface CartInfo {
  borderColor: string
}

const HtmlCartItem = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`

const CartItemInfo = styled.div<CartInfo>`
  margin-left: 10px;
  padding: 5px 12px;
  max-width: 210px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-left: 4px solid ${props => props.borderColor};
`

const CartItem = ({ type, price, bet, color }: Item): JSX.Element => {
  return (
    <HtmlCartItem>
      <OutlineButton color='#888888' padding='0 7px 0 0'>
        <IoTrashOutline />
      </OutlineButton>
      <CartItemInfo borderColor={color}>
        <Paragraph margin='5px auto' fontSize='0.9375em' color='#868686'>
          {bet.sort((a, b) => a - b).join(', ')}
        </Paragraph>
        <Paragraph margin='5px auto' fontSize='0.9375em' fontStyle='normal'>
          <Span color={color}>{type}</Span>
          <Span fontWeight='lighter'> R$ {floatToReal(price)}</Span>
        </Paragraph>
      </CartItemInfo>
    </HtmlCartItem>
  )
}

export default CartItem
