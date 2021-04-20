import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 100vh;

  @media (max-width: 699px) {
    margin-top: 100px;
  }
`

export const AuthenticationContainer = styled.div`
  text-align: center;
  width: min-content;
  margin: auto 20px;
`
