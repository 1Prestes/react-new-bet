import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import Navbar from '../Components/Navbar'
import { Paragraph, Span, SubTitle } from '../Components/typography'
import { OutlineButton } from '../Components/buttons'
import { fetchGames } from '../Services/loadGames'
import { floatToReal } from '../Services/floatToReal'

interface Bet {
  id: string
  userId: string
  bet: number[]
  kindOfGame: string
  color: string
  price: number
  date: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: 130px auto;
  padding: 0 10%;

  @media (min-width: 678px) {
    margin: 80px auto;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Games = styled.main`
  margin-top: 35px;
`

const Game = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 30px auto;
`

const BorderLeft = styled.div`
  background: ${props => props.color ?? 'red'};
  margin-right: 15px;
  height: 94px;
  width: 6px;
  border-radius: 100px;
`

const Home: React.FC = () => {
  const [filter, setFilter] = useState<string>()
  const [gamesFilter, setGamesFilter] = useState<Bet[]>([])
  const games = useAppSelector(state => state.games.games)
  const betCheckout: Bet[] = useAppSelector(state => state.games.checkout)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchGames())
    setGamesFilter(betCheckout)
  }, [])

  const selectFilter = (filter: string): void => {
    const currentBetsFilter = betCheckout.filter(
      game => game.kindOfGame === filter
    )
    setFilter(filter)
    setGamesFilter(currentBetsFilter)
  }

  return (
    <>
      <Navbar />
      <Container>
        <Actions>
          <FilterContainer>
            <SubTitle fontSize='1.5em' margin='auto 35px auto 0'>
              RECENT GAMES
            </SubTitle>

            <Paragraph margin='0 10px' color='#868686' fontSize='1.0625em'>
              Filters
            </Paragraph>
            <Filters>
              {games?.map(game => {
                let { color, type } = game
                let backgroundColor = 'transparent'
                const border = color
                if (game.type === filter) {
                  backgroundColor = color
                  color = '#fff'
                }

                return (
                  <OutlineButton
                    key={game.type}
                    onClick={() => selectFilter(game.type)}
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
              <Span color={'#505050'}>{filter}</Span>, what about you move to
              the bet page and{' '}
              <Span color='green'>
                <Link to='/new-bet'>take a chance right now?</Link>
              </Span>
            </SubTitle>
          )}
          {gamesFilter?.map((bet: Bet) => {
            return (
              <Game key={bet.id}>
                <BorderLeft color={bet.color} />
                <div>
                  <Paragraph fontSize='1.25em' color='#868686'>
                    {bet.bet
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
                    {new Date(bet.date).toLocaleDateString('pt-br')} - (R${' '}
                    {floatToReal(bet.price)})
                  </Paragraph>
                  <SubTitle fontSize='1.25em' color={bet.color}>
                    {bet.kindOfGame}
                  </SubTitle>
                </div>
              </Game>
            )
          })}
        </Games>
      </Container>
    </>
  )
}

export default Home
