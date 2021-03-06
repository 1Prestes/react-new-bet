import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { IconContext } from 'react-icons'
import { IoCartOutline } from 'react-icons/io5'

import {
  ADD_BET_TO_CART,
  fetchGames,
  SET_CURRENT_GAME
} from '../../store/gamesReducer'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  OutlineButton,
  Button,
  Span,
  SubTitle,
  TitleXS,
  Paragraph
} from '../../Components'
import Cart from '../../Components/Cart'
import GameNumbers from '../../Components/GameNumbers'
import Navbar from '../../Components/NavBar'
import {
  numberExists,
  removeNumber,
  generateGameNumbers,
  showMessage,
  getCookie
} from '../../Helpers'
import {
  Actions,
  ActionsContainer,
  BetContainer,
  BetGuide,
  ChooseNumber,
  GameInfo,
  GamesContainer,
  ErrorContainer
} from './NewBet'

const NewBet: React.FC = () => {
  const [gameNumbers, setGameNumbers] = useState<number[]>([])
  const [betNumbers, setBetNumbers] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const token = getCookie('@AUTH_TOKEN')
  const games = useAppSelector(state => state.games.games)
  const error = useAppSelector(state => state.games.error)
  const currentGame = useAppSelector(state => state.games.currentGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGames(token))
  }, [])

  useEffect(() => {
    if (error) {
      showMessage('error', error)
    }
  }, [error])

  useEffect(() => {
    dispatch(SET_CURRENT_GAME(games[0]))
  }, [games])

  useEffect(() => {
    setGameNumbers([])
    if (!currentGame) return

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

    if (betNumbers.length >= currentGame.max_number) return
    setBetNumbers([...betNumbers, numberSelected])
  }

  const completeGame = (): void => {
    const amount = currentGame.max_number - betNumbers.length
    const range = currentGame.range
    const completedNumbers = generateGameNumbers(amount, range, betNumbers)
    setBetNumbers([...completedNumbers])
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
    const { uid }: any = jwt.decode(token)
    if (betNumbers.length < currentGame.max_number) {
      const missingNumbers = currentGame.max_number - betNumbers.length
      showMessage(
        'error',
        `Select more ${missingNumbers} numbers to complete your bet`
      )
      return
    }
    const bet = {
      id: btoa(String(Date.now())),
      game_id: currentGame.id,
      userId: uid,
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

  const reconnect = (): void => {
    setLoading(true)
    dispatch(fetchGames(token)).then(res => {
      setTimeout(() => {
        if (!res.payload) {
          return setLoading(false)
        }
      }, 1000)
    })
  }

  return (
    <>
      <Navbar linkToHome={true} />

      <BetContainer>
        {!games[0].type && (
          <ErrorContainer>
            <SubTitle fontSize='1.5em' margin='auto 35px auto 0'>
              Error connecting to the server,{' '}
              <Button
                margin='10px auto'
                padding='5px 15px'
                backgroundColor='#ffc107'
                onClick={reconnect}
              >
                {!loading && 'try again'}
                {loading && 'carregando...'}
              </Button>
            </SubTitle>
          </ErrorContainer>
        )}
        {games[0].type && (
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

            <ChooseNumber>
              {currentGame &&
                gameNumbers.map(number => {
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
                })}
            </ChooseNumber>
            {currentGame && (
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
            )}
          </BetGuide>
        )}

        {games[0].type && <Cart />}
      </BetContainer>
    </>
  )
}

export default NewBet
