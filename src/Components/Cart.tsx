import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { Span, TitleXS } from './typography'
import { OutlineButton } from './buttons'
import CartItem from './CartItem'
import { floatToReal } from '../Services/floatToReal'

// interface CartItems {
//   [index: number]: {
//     bet: number[]
//     date: string
//     id: string
//     kindOfGame: string
//     price: number
//     userId: string
//   }
// }

const HtmlCart = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  width: 317px;
`

const CartContainer = styled.div`
  padding: 32px 17px;
`

const CartBody = styled.div`
  max-height: 335px;
  overflow: auto;
  margin-bottom: 15px;
`

const CartFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e2e2e2;
  height: 96px;
`

const Cart = ({ cartItems }: any): JSX.Element => {
  return (
    <HtmlCart>
      <CartContainer>
        <TitleXS margin='10px auto'>CART</TitleXS>

        <CartBody>
          {false && (
            <Span
              margin='10px auto'
              fontWeight='lighter'
              className='message message_cart'
              data-message='cart-status'
            >
              Seu carrinho está vazio!
            </Span>
          )}
          {!!cartItems.length &&
            cartItems.map((item: any) => {
              return (
                <CartItem
                  key={item.id}
                  type={item.kindOfGame}
                  price={item.price}
                  bet={item.bet}
                  color={item.color}
                />
              )
            })}
          {!cartItems.length && <Span>Your Cart has been Empty :'(</Span>}
        </CartBody>

        <TitleXS>
          CART{' '}
          <Span fontStyle='normal' fontWeight='lighter'>
            TOTAL: R${' '}
            {!!cartItems.length &&
              floatToReal(
                cartItems.reduce((accumulator: number, currentValue: any) => {
                  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                  return accumulator + currentValue.price
                }, 0)
              )}
          </Span>
        </TitleXS>
      </CartContainer>
      <CartFooter>
        <IconContext.Provider value={{ style: { paddingLeft: '19px' } }}>
          <OutlineButton color='#27c383'>
            Save <IoMdArrowForward />
          </OutlineButton>
        </IconContext.Provider>
      </CartFooter>
    </HtmlCart>
  )
}

export default Cart
