import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoCartOutline } from 'react-icons/io5'

import { fetchGames } from '../Services/loadGames'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { ADD_BET_TO_CART, SET_CURRENT_GAME } from '../store/gamesReducer'
import Navbar from './Navbar'
import { OutlineButton, Button } from './buttons'
import { Span, SubTitle, TitleXS, Paragraph } from './typography'
import Cart from './Cart'
import GameNumbers from './GameNumbers'
import { numberExists } from '../Services/numberExists'
import { removeNumber } from '../Services/removeNumber'
import { generateGameNumbers } from '../Services/generateGameNumbers'
import { showMessage } from '../Services/toast'

const BetContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  margin: 130px auto;
  max-width: 1440px;
  padding: 0 10px;

  @media (min-width: 678px) {
    margin: 75px auto;
  }
`

const BetGuide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 576px) {
    display: block;
    max-width: 750px;
    padding: 0 10px;
  }
`

const GameInfo = styled.div`
  margin-top: 35px;
  max-width: 648px;
  padding: 0 20px;

  @media (min-width: 576px) {
    padding: inherit;
  }
`

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ChooseNumber = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px 0 40px 0;

  @media (min-width: 576px) {
    justify-content: flex-start;
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 25px 0;
`

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  @media (min-width: 678px) {
    width: inherit;
  }
`

const NewBet: React.FC = () => {
  const [gameNumbers, setGameNumbers] = useState<number[]>([])
  const [betNumbers, setBetNumbers] = useState<number[]>([])
  const user = useAppSelector(state => state.user.user)
  const games = useAppSelector(state => state.games.games)
  const currentGame = useAppSelector(state => state.games.currentGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchGames())
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

  const toggleGame = (event: React.FormEvent<HTMLButtonElement>): void => {
    const target = event.target as HTMLButtonElement
    const currentGame = games.filter(
      game => game.type === target.dataset.currentGame
    )
    setBetNumbers([])
    dispatch(SET_CURRENT_GAME(currentGame[0]))
  }

  const chooseNumber = (event: React.MouseEvent<HTMLDivElement>): void => {
    const numberSelected = Number(event.currentTarget.dataset.number)

    if (numberExists(betNumbers, numberSelected)) {
      const arr = removeNumber(betNumbers, numberSelected)
      return setBetNumbers(arr)
    }

    if (betNumbers.length >= currentGame['max-number']) return
    setBetNumbers([...betNumbers, numberSelected])
  }

  const completeGame = (): void => {
    const amount = currentGame['max-number'] - betNumbers.length
    const range = currentGame.range
    const completedNumbers = generateGameNumbers(amount, range, betNumbers)
    setBetNumbers([...betNumbers, ...completedNumbers])
  }

  const clearGame = (clicked: boolean): void => {
    if (betNumbers.length === 0) {
      showMessage('error', 'no number selected')
      return
    }
    setBetNumbers([])
    if (clicked) showMessage('success', 'Clear game successfully')
  }

  const addToCart = (): void => {
    if (betNumbers.length < currentGame['max-number']) {
      const missingNumbers = currentGame['max-number'] - betNumbers.length
      showMessage(
        'error',
        `Select more ${missingNumbers} numbers to complete your bet`
      )
      return
    }
    const bet = {
      id: btoa(String(Date.now())),
      userId: user.id,
      bet: betNumbers,
      kindOfGame: currentGame.type,
      color: currentGame.color,
      price: currentGame.price,
      date: String(new Date())
    }
    dispatch(ADD_BET_TO_CART(bet))
    showMessage('success', 'Bet added on cart :D')
    clearGame(false)
  }

  const renderNumbers = (): JSX.Element[] => {
    return gameNumbers.map(number => {
      let selected = false
      if (betNumbers.includes(number)) selected = true
      return (
        <GameNumbers
          key={number}
          number={number}
          selected={selected}
          clicked={chooseNumber}
        />
      )
    })
  }

  return (
    <>
      <Navbar linkToHome={true} />

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

          <ChooseNumber>{renderNumbers()}</ChooseNumber>

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
                onClick={() => clearGame(true)}
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
                onClick={addToCart}
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
