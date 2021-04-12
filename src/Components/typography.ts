import styled from 'styled-components'

interface Typography {
  margin?: string
  fontSize?: string
}

export const TitleSM = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.sm};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const TitleMD = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.md};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const TitleXL = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.md};
  color: ${props => props.color ?? props.theme.typography.color};
`
export const Paragraph = styled.p<Typography>`
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin ?? 'auto'};
  color: ${props => props.color ?? props.theme.typography.color};
`
