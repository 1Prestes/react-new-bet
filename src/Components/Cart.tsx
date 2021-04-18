import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { Span, TitleXS } from './typography'
import { OutlineButton } from './buttons'
import CartItem from './CartItem'
import { floatToReal } from '../Services/floatToReal'
import { useAppSelector } from '../store/hooks'

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

const Cart = (): JSX.Element => {
  const cartItems = useAppSelector(state => state.games.bet)

  return (
    <HtmlCart>
      <CartContainer>
        <TitleXS margin='10px auto'>CART</TitleXS>

        <CartBody>
          {!cartItems.length && (
            <Span
              margin='10px auto'
              fontWeight='lighter'
              className='message message_cart'
              data-message='cart-status'
            >
              Your Cart has been Empty :'(
            </Span>
          )}
          {
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          cartItems &&
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
