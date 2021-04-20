import styled from 'styled-components'

export const BetContainer = styled.main`
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

export const BetGuide = styled.div`
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

export const GameInfo = styled.div`
margin-top: 35px;
max-width: 648px;
padding: 0 20px;

@media (min-width: 576px) {
  padding: inherit;
}
`

export const GamesContainer = styled.div`
display: flex;
flex-wrap: wrap;
`

export const ChooseNumber = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin: 30px 0 40px 0;

@media (min-width: 576px) {
  justify-content: flex-start;
}
`

export const Actions = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
margin: 25px 0;
`

export const ActionsContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;

@media (min-width: 678px) {
  width: inherit;
}
`
