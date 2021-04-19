import React from 'react'
import styled from 'styled-components'

interface IGameNumber {
  number: number
  selected: boolean
  clicked: React.MouseEventHandler<HTMLDivElement> | undefined
}

interface NumberSelected {
  selected: boolean
}

const GameNumber = styled.div<NumberSelected>`
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

const GameNumbers = ({
  number,
  clicked,
  selected
}: IGameNumber): React.ReactElement => {
  return (
    <GameNumber onClick={clicked} data-number={number} selected={selected}>
      {number < 10 ? `0${number}` : number}
    </GameNumber>
  )
}

export default GameNumbers
