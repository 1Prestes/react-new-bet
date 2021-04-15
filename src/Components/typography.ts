import styled from 'styled-components'

interface Typography {
  margin?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
  textTransform?: string
}

export const TitleXS = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.xs};
  text-transform: ${props => props.textTransform ?? 'none'};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const TitleSM = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.sm};
  text-transform: ${props => props.textTransform ?? 'none'};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const TitleMD = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.md};
  text-transform: ${props => props.textTransform ?? 'none'};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const TitleXL = styled.h1<Typography>`
  margin: ${props => props.margin ?? 'auto'};
  font-size: ${props => props.theme.typography.md};
  text-transform: ${props => props.textTransform ?? 'none'};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const SubTitle = styled.h2<Typography>`
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin ?? 'auto'};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-style: ${props => props.fontStyle ?? 'italic'};
  text-transform: ${props => props.textTransform ?? 'none'};
  color: ${props => props.color ?? props.theme.typography.color};  
`

export const Paragraph = styled.p<Typography>`
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin ?? 'auto'};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-style: ${props => props.fontStyle ?? 'italic'};
  text-transform: ${props => props.textTransform ?? 'none'};
  color: ${props => props.color ?? props.theme.typography.color};
`

export const Span = styled.span<Typography>`
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin ?? 'auto'};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-style: ${props => props.fontStyle ?? 'italic'};
  text-transform: ${props => props.textTransform ?? 'none'};
  color: ${props => props.color ?? props.theme.typography.color};
`
