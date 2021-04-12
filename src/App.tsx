import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './assets/styles/global-styles'
import theme from './assets/styles/theme'
import SignIn from './Pages/Sign-in'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SignIn />
    </ThemeProvider>
  )
}

export default App
