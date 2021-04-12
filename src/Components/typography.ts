import styled from 'styled-components'

export const TitleSM = styled.h1`
  font-size: ${props => props.theme.typography.sm};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const TitleMD = styled.h1`
  font-size: ${props => props.theme.typography.md};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const TitleXL = styled.h1`
  font-size: ${props => props.theme.typography.md};
  color: ${props => props.color ?? props.theme.typography.color};
`
