import React from 'react'
import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'

import { OutlineButton } from './buttons'
import { Paragraph, Span } from './typography'

const HtmlCartItem = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`

const CartItemInfo = styled.div`
  margin-left: 10px;
  padding: 10px 12px;
  max-width: 210px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-left: 4px solid rgb(1, 172, 102);
`

const CartItem: React.FC = () => {
  return (
    <HtmlCartItem>
      <OutlineButton color='#888888' padding='0 7px 0 0'>
        <IoTrashOutline />
      </OutlineButton>
      <CartItemInfo>
        <Paragraph fontSize='0.9375em' color='#868686'>
          02, 03, 07, 38, 47, 60
        </Paragraph>
        <Paragraph fontSize='0.9375em' fontStyle='normal'>
          <Span color='rgb(1, 172, 102)'>Mega-Sena</Span>
          <Span fontWeight='lighter'> R$ 4,50</Span>
        </Paragraph>
      </CartItemInfo>
    </HtmlCartItem>
  )
}

export default CartItem
