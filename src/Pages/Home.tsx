import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoMdArrowForward } from 'react-icons/io'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import Navbar from '../Components/Navbar'
import { Paragraph, SubTitle } from '../Components/typography'
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
  margin: 80px auto;
  padding: 0 10%;
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
  const [gamesFilter, setGamesFilter] = useState<Bet[]>()
  const games = useAppSelector(state => state.games.games)
  const betCheckout: Bet[] = useAppSelector(state => state.games.checkout)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchGames())
    setGamesFilter(betCheckout)
  }, [])

  const selectFilter = (filter: string): void => {
    const currentBetsFilter = betCheckout.filter(game => game.kindOfGame === filter)
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
          {gamesFilter?.map((bet: Bet) => {
            return (
              <Game key={bet.id}>
                <BorderLeft color={bet.color} />
                <div>
                  <Paragraph fontSize='1.25em' color='#868686'>
                    {bet.bet
                      .slice()
                      .sort((a, b) => a - b)
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
          {/* <Game>
            <BorderLeft color='#7f3992' />
            <div>
              <Paragraph fontSize='1.25em' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </Paragraph>
              <Paragraph
                margin='15px auto'
                fontSize='17px'
                color='#868686'
                fontWeight='normal'
              >
                30/11/2020 - (R$ 2,50)
              </Paragraph>
              <SubTitle fontSize='1.25em' color='#7f3992'>
                Lotofácil
              </SubTitle>
            </div>
          </Game>

          <Game>
            <BorderLeft color='#01ac66' />
            <div>
              <Paragraph fontSize='1.25em' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </Paragraph>
              <Paragraph
                margin='15px auto'
                fontSize='17px'
                color='#868686'
                fontWeight='normal'
              >
                30/11/2020 - (R$ 2,50)
              </Paragraph>
              <SubTitle fontSize='1.25em' color='#01ac66'>
                Mega-Sena
              </SubTitle>
            </div>
          </Game>

          <Game>
            <BorderLeft color='#f79c31' />
            <div>
              <Paragraph fontSize='1.25em' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </Paragraph>
              <Paragraph
                margin='15px auto'
                fontSize='17px'
                color='#868686'
                fontWeight='normal'
              >
                30/11/2020 - (R$ 2,50)
              </Paragraph>
              <SubTitle fontSize='1.25em' color='#f79c31'>
                Lotomania
              </SubTitle>
            </div>
          </Game> */}
        </Games>
      </Container>
    </>
  )
}

export default Home
