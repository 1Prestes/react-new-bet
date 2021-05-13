import styled from 'styled-components'

export const Container = styled.div`
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

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Games = styled.main`
  margin-top: 35px;
`

export const Game = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 30px auto;
`

export const BorderLeft = styled.div`
  background: ${props => props.color ?? 'red'};
  margin-right: 15px;
  height: 94px;
  width: 6px;
  border-radius: 100px;
`

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`
