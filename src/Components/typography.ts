import styled from 'styled-components'

interface Typography {
  margin?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

export const TitleXS = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.xs};
  color: ${props => props.color ?? props.theme.typography.color};
`

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

export const SubTitle = styled.h2<Typography>`
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin ?? 'auto'};
  color: ${props => props.color ?? props.theme.typography.color};  
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-style: ${props => props.fontStyle ?? 'italic'};
`

export const Paragraph = styled.p<Typography>`
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin ?? 'auto'};
  color: ${props => props.color ?? props.theme.typography.color};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-style: ${props => props.fontStyle ?? 'italic'};
`

export const Span = styled.span<Typography>`
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin ?? 'auto'};
  color: ${props => props.color ?? props.theme.typography.color};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-style: ${props => props.fontStyle ?? 'italic'};
`
