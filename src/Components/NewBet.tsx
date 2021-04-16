import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoCartOutline } from 'react-icons/io5'

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { LOAD_GAMES, SET_CURRENT_GAME } from '../store/gamesReducer'
import Navbar from './Navbar'
import { OutlineButton, Button } from './buttons'
import { Span, SubTitle, TitleXS, Paragraph } from './typography'
import Cart from './Cart'
import GameNumbers from './GameNumbers'
import { numberExists } from '../Services/numberExists'
import { removeNumber } from '../Services/removeNumber'
import { generateGameNumbers } from '../Services/generateGameNumbers'

const BetContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  margin: 75px auto;
  max-width: 1440px;
`

const BetGuide = styled.div`
  max-width: 750px;
  padding: 0 10px;
`

const GameInfo = styled.div`
  margin-top: 35px;
  max-width: 648px;
`

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ChooseNumber = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0 40px 0;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 25px 0;
`

const ActionsContainer = styled.div`
  display: flex;
`

const NewBet: React.FC = () => {
  const [gameNumbers, setGameNumbers] = useState<number[]>([])
  const [betNumbers, setBetNumbers] = useState<number[]>([])
  const games = useAppSelector(state => state.games.games)
  const currentGame = useAppSelector(state => state.games.currentGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getData (): Promise<any> {
      await fetch('http://localhost:8080/types', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(async response => {
          return await response.json()
        })
        .then(games => {
          return dispatch(LOAD_GAMES(games))
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData()
  }, [])

  useEffect(() => {
    dispatch(SET_CURRENT_GAME(games[0]))
  }, [games])

  useEffect(() => {
    setGameNumbers([])
    for (let i = 1; i <= currentGame.range; i++) {
      setGameNumbers(prevState => [...prevState, i])
    }
  }, [currentGame])

  useEffect(() => {
    clearNumbers(betNumbers)
    paintNumbers(betNumbers)
  }, [betNumbers])

  const toggleGame = (event: React.FormEvent<HTMLButtonElement>): void => {
    const target = event.target as HTMLButtonElement
    const currentGame = games.filter(
      game => game.type === target.dataset.currentGame
    )
    setBetNumbers([])
    clearNumbers(betNumbers)
    dispatch(SET_CURRENT_GAME(currentGame[0]))
  }

  // const paintNumber = (element: HTMLDivElement, color: string): void => {
  //   element.style.setProperty('background-color', color)
  // }

  const clearNumbers = (arrNumbers: number[]): void => {
    arrNumbers.map((number: number) => {
      const element = document.querySelector(
        `div[data-number="${number}"]`
      ) as HTMLElement
      return element?.removeAttribute('data-number-selected')
    })
  }

  const paintNumbers = (arrNumbers: number[]): void => {
    arrNumbers.map((number: number) => {
      const element = document.querySelector(
        `div[data-number="${number}"]`
      ) as HTMLElement
      return element?.setAttribute('data-number-selected', 'selected')
    })
  }

  const chooseNumber = (event: React.FormEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement
    const numberSelected = Number(target.dataset.number)
    if (numberExists(betNumbers, numberSelected)) {
      const arr = removeNumber(betNumbers, numberSelected)
      setBetNumbers(arr)
      return clearNumbers(betNumbers)
    }

    if (betNumbers.length >= currentGame['max-number']) return
    setBetNumbers([...betNumbers, numberSelected])
  }

  const completeGame = (): void => {
    const amount = currentGame['max-number'] - betNumbers.length
    const range = currentGame.range
    const completedNumbers = generateGameNumbers(amount, range, betNumbers)
    setBetNumbers(completedNumbers)
    paintNumbers(betNumbers)
  }

  const clearGame = (): void => {
    setBetNumbers([])
    clearNumbers(betNumbers)
  }

  return (
    <>
      <Navbar />

      <BetContainer>
        <BetGuide>
          <TitleXS>
            NEW BET{' '}
            <Span textTransform='uppercase' fontWeight='lighter'>
              FOR {currentGame?.type}
            </Span>
          </TitleXS>

          <GameInfo>
            <SubTitle fontSize='1.0625em'>Choose a game</SubTitle>
            <GamesContainer>
              {games?.map(game => {
                let { color, type } = game
                let backgroundColor = 'transparent'
                const border = color
                if (game.type === currentGame.type) {
                  backgroundColor = color
                  color = '#fff'
                }

                return (
                  <OutlineButton
                    key={game.type}
                    onClick={toggleGame}
                    data-current-game={game.type}
                    fontSize='0.875em'
                    color={color}
                    backgroundColor={backgroundColor}
                    border={`2px solid ${border}`}
                    margin='20px 25px auto 0'
                  >
                    {type}
                  </OutlineButton>
                )
              })}
            </GamesContainer>
          </GameInfo>

          <GameInfo>
            <SubTitle margin='10px auto' fontSize='1.0625em'>
              Fill your bet
            </SubTitle>
            <Paragraph fontSize='1.0625em' fontWeight='lighter'>
              {currentGame?.description}
            </Paragraph>
          </GameInfo>
          {betNumbers.sort((a, b) => a - b).join(', ')}
          <ChooseNumber>
            {currentGame &&
              gameNumbers.map(number => (
                <GameNumbers
                  key={number}
                  number={number}
                  clicked={chooseNumber}
                />
              ))}
          </ChooseNumber>

          <Actions>
            <ActionsContainer>
              <OutlineButton
                onClick={completeGame}
                margin='5px 25px auto 0'
                padding='17px 25px'
                fontWeight='600'
                fontStyle='normal'
                border='1px solid #27c383'
                fontSize='1em'
                color='#27c383'
              >
                Complete Game
              </OutlineButton>
              <OutlineButton
                onClick={clearGame}
                margin='5px 25px auto 0'
                padding='17px 25px'
                fontWeight='600'
                fontStyle='normal'
                border='1px solid #27c383'
                fontSize='1em'
                color='#27c383'
              >
                Clear game
              </OutlineButton>
            </ActionsContainer>
            <IconContext.Provider
              value={{
                style: {
                  width: '30px',
                  fontSize: '30px',
                  marginRight: '28px'
                }
              }}
            >
              <Button
                backgroundColor='#27c383'
                padding='17px 43px'
                borderRadius='10px'
                fontWeight='600'
                fontStyle='normal'
                color='#fff'
              >
                <IoCartOutline />
                Add to cart
              </Button>
            </IconContext.Provider>
          </Actions>
        </BetGuide>

        <Cart />
      </BetContainer>
    </>
  )
}

export default NewBet
