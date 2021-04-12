import styled from 'styled-components'

interface ButtonProps {
  fontSize?: string
  width?: string
  height?: string
  padding?: string
  margin?: string
  backgroundColor?: string
}

export const Button = styled.button<ButtonProps>`
  background-color: ${props => props.backgroundColor ?? 'blue'};
  border-radius: 100px;
  width: ${props => props.width ?? 'max-content'};
  height: ${props => props.height};
  color: ${props => props.color ?? '#fff'};
  margin: ${props => props.margin ?? 'auto'};
  font-size: 22px;
  font-weight: bold;
  font-style: italic;
`

export const OutlineButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: ${props => props.width ?? 'max-content'};
  margin: ${props => props.margin ?? 0};
  padding: ${props => props.padding ?? '10px 20px'};
  font-style: italic;
  font-weight: bold;
  font-size: ${(props) => props.fontSize ?? props.theme.typography.sm};
  color: ${props => props.color};

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.color};
  }
`
