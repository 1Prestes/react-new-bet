import styled from 'styled-components'

interface NumberSelected {
  selected: boolean
}

export const GameNumber = styled.div<NumberSelected>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.selected ? 'green' : '#adc0c4'};
  margin: 20px 5px 20px 5px;
  width: 65px;
  height: 65px;
  border-radius: 100px;
  font-size: 1.25em;
  font-weight: 700;
  cursor: pointer;
  color: #fff;

  @media (min-width: 576px) {
    margin: 20px 12px 20px 0;
  }
`
