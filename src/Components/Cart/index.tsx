import { useHistory } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { ICartItem, checkoutGames, CLEAR_CART } from '../../store/gamesReducer'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import CartItem from '../CartItem'
import { Span, TitleXS, OutlineButton } from '../'
import { floatToReal, getCookie, showMessage } from '../../Helpers'
import { HtmlCart, CartBody, CartContainer, CartFooter } from './Cart'

interface CurrentValue {
  price: number
}

const Cart = (): JSX.Element => {
  const token = getCookie('@AUTH_TOKEN')
  const cartItems: any = useAppSelector(state => state.games.cart)
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
    if (totalCart() < 30) {
      showMessage(
        'error',
        'The minimum cart value is $ 30, add more games to the cart and try again.',
        5000
      )
      return
    }

    const games = cartItems.map((item: ICartItem) => ({
      game_id: item.game_id,
      betnumbers: item.bet.toString()
    }))

    dispatch(checkoutGames({ token, games }))
      .then(res => {
        if (res.payload === undefined) {
          showMessage(
            'error',
            'Error connecting to the server, try again or wait a few minutes'
          )
          return
        }

        showMessage(
          'success',
          'Congratulations, you will be redirected in 2 seconds',
          2000
        )
        setTimeout(() => {
          dispatch(CLEAR_CART())
          history.push('/home')
        }, 3000)
      })
      .catch(error => showMessage('error', error.message))
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
            <OutlineButton onClick={checkout} color='#27c383'>
              Save <IoMdArrowForward />
            </OutlineButton>
          </IconContext.Provider>
        </CartFooter>
      )}
    </HtmlCart>
  )
}

export default Cart
