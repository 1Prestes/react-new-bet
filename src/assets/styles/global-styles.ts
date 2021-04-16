import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f7f7f7;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-style: italic;
    color: #707070;
  }

  button {
    border: none;
    outline: none;
  }
  div[data-number-selected="selected"] {
    background-color: green;
  }
`

export default GlobalStyles
