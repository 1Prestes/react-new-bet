import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchBets, fetchGames } from '../../store/gamesReducer'
import Navbar from '../../Components/NavBar'
import {
  Paragraph,
  Span,
  SubTitle,
  OutlineButton,
  Button
} from '../../Components/'
import { floatToReal, getCookie, showMessage } from '../../Helpers'
import {
  Container,
  Actions,
  FilterContainer,
  Filters,
  Games,
  Game,
  BorderLeft,
  ErrorContainer
} from './Home'

interface Bet {
  id: string
  game_id: number
  userId: string
  betnumbers: string
  color: string
  price: number
  created_at: string
}

const Home: React.FC = () => {
  const [filter, setFilter] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [gamesFilter, setGamesFilter] = useState<Bet[]>([])
  // const [errorBets, setErrorBets] = useState(false)
  const games = useAppSelector(state => state.games.games)
  const error = useAppSelector(state => state.games.error)
  const cart = useAppSelector(state => state.games.cart)
  const token = getCookie('@AUTH_TOKEN')
  const betCheckout: Bet[] = useAppSelector(state => state.games.checkout)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGames(token))
    dispatch(fetchBets(token))
    setGamesFilter(betCheckout)
  }, [])

  useEffect(() => {
    setGamesFilter(betCheckout)
  }, [betCheckout])

  useEffect(() => {
    dispatch(fetchBets(token))
  }, [cart])

  useEffect(() => {
    if (error) {
      showMessage('error', error)
    }
  }, [error])

  const selectFilter = (filter: number): void => {
    const currentBetsFilter = betCheckout.filter(
      game => game.game_id === filter
    )

    setFilter(filter)
    setGamesFilter(currentBetsFilter)
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
    dispatch(fetchBets(token))
  }

  return (
    <>
      <Navbar />
      {!games[0].type && (
        <ErrorContainer>
          <SubTitle fontSize='1.5em' margin='auto 35px auto 0'>
            Error connecting to the server{' '}
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
      <Container>
        {games[0].type && (
          <Actions>
            <FilterContainer>
              <SubTitle fontSize='1.5em' margin='auto 35px auto 0'>
                RECENT GAMES
              </SubTitle>

              <Paragraph margin='0 10px' color='#868686' fontSize='1.0625em'>
                Filters
              </Paragraph>
              <Filters>
                {games[0]?.type &&
                  games.map(game => {
                    let { color, type } = game
                    let backgroundColor = 'transparent'
                    const border = color
                    if (game.id === filter) {
                      backgroundColor = color
                      color = '#fff'
                    }

                    return (
                      <OutlineButton
                        key={game.type}
                        onClick={() => selectFilter(game.id)}
                        data-current-game={game.type}
                        fontSize='0.875em'
                        color={color}
                        backgroundColor={backgroundColor}
                        border={`2px solid ${border}`}
                        margin='auto 10px'
                      >
                        {type}
                      </OutlineButton>
                    )
                  })}
              </Filters>
            </FilterContainer>

            <IconContext.Provider value={{ style: { marginLeft: '10px' } }}>
              <Link to='/new-bet'>
                <OutlineButton fontSize='1.5em' color='#B5C401'>
                  New Bet <IoMdArrowForward />
                </OutlineButton>
              </Link>
            </IconContext.Provider>
          </Actions>
        )}

        {!betCheckout.length && (
          <Games>
            {!betCheckout.length && (
              <SubTitle fontSize='1.2em' fontStyle='normal'>
                Opsy! It seems that you still don't have any bet done. Why don't
                you go to the bet page and{' '}
                <Span color='green'>
                  <Link to='/new-bet'>start it right now?</Link>
                </Span>
              </SubTitle>
            )}

            {!!betCheckout.length && !gamesFilter.length && (
              <SubTitle fontSize='1.2em' fontStyle='normal'>
                Opsy! I see that you still don't have any bet from type{' '}
                <Span color='#505050'>{filter}</Span>, what about you move to
                the bet page and{' '}
                <Span color='green'>
                  <Link to='/new-bet'>take a chance right now?</Link>
                </Span>
              </SubTitle>
            )}

            {gamesFilter?.map((bet: Bet) => {
              return (
                <Game key={bet.id}>
                  <BorderLeft
                    color={
                      games.filter(game => game.id === bet.game_id)[0].color
                    }
                  />
                  <div>
                    <Paragraph fontSize='1.25em' color='#868686'>
                      {bet.betnumbers
                        .split(',')
                        .map(number => Number(number))
                        .slice()
                        .sort((a, b) => a - b)
                        .map(number => {
                          return number < 10 ? `0${number}` : number
                        })
                        .join(', ')}
                    </Paragraph>
                    <Paragraph
                      margin='15px auto'
                      fontSize='17px'
                      color='#868686'
                      fontWeight='normal'
                    >
                      {new Date(bet.created_at).toLocaleDateString('pt-br')} -
                      (R$ {floatToReal(bet.price)})
                    </Paragraph>
                    <SubTitle
                      fontSize='1.25em'
                      color={
                        games.filter(game => game.id === bet.game_id)[0].color
                      }
                    >
                      {games.filter(game => game.id === bet.game_id)[0].type}
                    </SubTitle>
                  </div>
                </Game>
              )
            })}
          </Games>
        )}
      </Container>
    </>
  )
}

export default Home
