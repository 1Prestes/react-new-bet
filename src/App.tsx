import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './assets/styles/global-styles'
import ResetCSS from './assets/styles/reset-css'
import theme from './assets/styles/theme'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ResetCSS />
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  )
}

export default App
