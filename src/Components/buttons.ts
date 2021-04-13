import styled from 'styled-components'

interface ButtonProps {
  fontSize?: string
  width?: string
  height?: string
  padding?: string
  margin?: string
  backgroundColor?: string
  border?: string
  fontStyle?: string
  fontWeight?: string
  borderRadius?: string
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor ?? 'blue'};
  width: ${props => props.width ?? 'max-content'};
  margin: ${props => props.margin ?? 'auto'};
  padding: ${props => props.padding ?? '0'};
  height: ${props => props.height};
  border-radius: ${props => props.borderRadius ?? '100px'};
  font-size:  ${(props) => props.fontSize ?? '22px'};
  font-style: ${props => props.fontStyle ?? 'italic'};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  color: ${props => props.color ?? '#fff'};
`

export const OutlineButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor ?? 'transparent'};
  width: ${props => props.width ?? 'max-content'};
  margin: ${props => props.margin ?? 0};
  padding: ${props => props.padding ?? '10px 20px'};
  border-radius: 10px;
  border: ${props => props.border ?? 'none'};
  font-style: ${props => props.fontStyle ?? 'italic'};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-size: ${(props) => props.fontSize ?? props.theme.typography.sm};
  color: ${props => props.color};

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.color};
  }
`
