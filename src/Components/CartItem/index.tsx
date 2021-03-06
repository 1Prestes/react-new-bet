import { IoTrashOutline } from 'react-icons/io5'

import { REMOVE_BET_OF_CART } from '../../store/gamesReducer'
import { useAppDispatch } from '../../store/hooks'
import { OutlineButton, Paragraph, Span } from '../'
import { floatToReal, showMessage } from '../../Helpers'
import { CartItemInfo, HtmlCartItem } from './CartItem'

interface Item {
  type: string
  price: number
  bet: number[]
  color: string
  id: string
}

const CartItem = ({ type, price, bet, color, id }: Item): JSX.Element => {
  const dispatch = useAppDispatch()
  const handleClick = (id: string): void => {
    dispatch(REMOVE_BET_OF_CART(id))
    showMessage('success', 'Bet removed successfully')
  }

  return (
    <HtmlCartItem>
      <OutlineButton
        onClick={() => handleClick(id)}
        data-id={id}
        color='#888888'
        padding='0 7px 0 0'
      >
        <IoTrashOutline data-id={id} />
      </OutlineButton>
      <CartItemInfo borderColor={color}>
        <Paragraph margin='5px auto' fontSize='0.9375em' color='#868686'>
          {bet
            .slice()
            .sort((a, b) => a - b)
            .map(number => {
              return number < 10 ? `0${number}` : number
            })
            .join(', ')}
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
