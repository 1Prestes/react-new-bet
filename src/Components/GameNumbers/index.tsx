import React from 'react'

import { GameNumber } from './GameNumbers'

interface IGameNumber {
  number: number
  selected: boolean
  clicked: React.MouseEventHandler<HTMLDivElement> | undefined
}

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
