import { useHistory } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { ADD_TO_CHECKOUT } from '../../store/gamesReducer'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import CartItem from '../CartItem'
import { Span, TitleXS, OutlineButton } from '../'
import { floatToReal, showMessage } from '../../Helpers'
import { HtmlCart, CartBody, CartContainer, CartFooter } from './Cart'

interface CurrentValue {
  price: number
}

interface ICartItem {
  key: string
  kindOfGame: string
  price: number
  bet: number[]
  color: string
  id: string
}

const Cart = (): JSX.Element => {
  const cartItems = useAppSelector(state => state.games.cart)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const totalCart = (): number => {
    return (
      cartItems.length &&
      cartItems.reduce((accumulator: number, currentValue: CurrentValue) => {
        return accumulator + currentValue.price
      }, 0)
    )
  }

  const checkout = (): void => {
    showMessage(
      'success',
      'Congratulations, you will be redirected in 2 seconds',
      2000
    )
    setTimeout(() => {
      dispatch(ADD_TO_CHECKOUT(cartItems))
      history.push('/home')
    }, 3000)
  }

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
          {// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          cartItems &&
            cartItems.map((item: ICartItem) => {
              return (
                <CartItem
                  key={item.id}
                  type={item.kindOfGame}
                  price={item.price}
                  bet={item.bet}
                  color={item.color}
                  id={item.id}
                />
              )
            })}
        </CartBody>
        {!!cartItems.length && (
          <TitleXS>
            CART{' '}
            <Span fontStyle='normal' fontWeight='lighter'>
              TOTAL: R$ {floatToReal(totalCart())}
            </Span>
          </TitleXS>
        )}
      </CartContainer>
      {!!totalCart() && (
        <CartFooter>
          <IconContext.Provider value={{ style: { paddingLeft: '19px' } }}>
            <OutlineButton
              onClick={checkout}
              disabled={totalCart() < 30}
              color='#27c383'
            >
              Save <IoMdArrowForward />
            </OutlineButton>
          </IconContext.Provider>
        </CartFooter>
      )}
    </HtmlCart>
  )
}

export default Cart