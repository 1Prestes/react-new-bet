import styled from 'styled-components'

interface CartInfo {
  borderColor: string
}

export const HtmlCartItem = styled.div`
display: flex;
align-items: center;
margin: 20px 0;
`

export const CartItemInfo = styled.div<CartInfo>`
margin-left: 10px;
padding: 5px 12px;
max-width: 210px;
border-top-left-radius: 3px;
border-bottom-left-radius: 3px;
border-left: 4px solid ${props => props.borderColor};
`
