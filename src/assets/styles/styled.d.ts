import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: {
      sm: string
      md: string
      xl: string
      color: string
    }
  }
}
