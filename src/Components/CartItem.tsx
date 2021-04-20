import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'

import { REMOVE_BET_OF_CART } from '../store/gamesReducer'
import { useAppDispatch } from '../store/hooks'
import { OutlineButton, Paragraph, Span } from './'
import { floatToReal, showMessage } from '../Services/'

interface Item {
  type: string
  price: number
  bet: number[]
  color: string
  id: string
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
