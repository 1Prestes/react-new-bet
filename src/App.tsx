import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './assets/styles/global-styles'
import theme from './assets/styles/theme'
import SignIn from './Pages/Sign-in'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <SignIn />
      </Routes>
    </ThemeProvider>
  )
}

export default App
