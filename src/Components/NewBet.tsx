import React from 'react'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { IoCartOutline } from 'react-icons/io5'

import Navbar from './Navbar'
import { OutlineButton, Button } from './buttons'
import { Span, SubTitle, TitleXS, Paragraph } from './typography'
import Cart from './Cart'

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
  return (
    <>
      <Navbar />

      <BetContainer>
        <BetGuide>
          <TitleXS>
            NEW BET <Span fontWeight='lighter'>FOR MEGA-SENA</Span>
          </TitleXS>

          <GameInfo>
            <SubTitle fontSize='1.0625em'>Choose a game</SubTitle>
            <GamesContainer>
              <OutlineButton
                fontSize='0.875em'
                color='#7f3992'
                border='2px solid #7f3992'
                margin='20px 25px auto 0'
              >
                Lotofácil
              </OutlineButton>
              <OutlineButton
                fontSize='0.875em'
                color='#fff'
                backgroundColor='#01ac66'
                border='2px solid #01ac66'
                margin='20px 25px auto 0'
              >
                Mega-Sena
              </OutlineButton>
              <OutlineButton
                fontSize='0.875em'
                color='#f79c31'
                border='2px solid #f79c31'
                margin='20px 25px auto 0'
              >
                Lotomania
              </OutlineButton>
            </GamesContainer>
          </GameInfo>

          <GameInfo>
            <SubTitle margin='10px auto' fontSize='1.0625em'>
              Fill your bet
            </SubTitle>
            <Paragraph fontSize='1.0625em' fontWeight='lighter'>
              Fill your bet Mark as many numbers as you want up to a maximum of
              50. Win by hitting 15, 16, 17, 18, 19, 20 or none of the 20
              numbers drawn.
            </Paragraph>
          </GameInfo>

          <ChooseNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
            <GameNumber>01</GameNumber>
          </ChooseNumber>

          <Actions>
            <ActionsContainer>
              <OutlineButton
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
