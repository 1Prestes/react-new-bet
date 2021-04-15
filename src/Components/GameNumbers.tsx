import React from 'react'
import styled from 'styled-components'

interface IGameNumber {
  number: number
  clicked: React.MouseEventHandler<HTMLDivElement> | undefined
}

const GameNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #adc0c4;
  margin: 20px 12px 20px 0;
  width: 65px;
  height: 65px;
  border-radius: 100px;
  font-size: 1.25em;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
`

const GameNumbers = ({
  number,
  clicked
}: IGameNumber): React.ReactElement => {
  return (
    <GameNumber onClick={clicked} data-number={number}>
      {number < 10 ? `0${number}` : number}
    </GameNumber>
  )
}

export default GameNumbers
