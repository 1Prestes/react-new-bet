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
  cursor: pointer;
  color: ${props => props.color ?? '#fff'};

  &[disabled] {
    cursor: not-allowed;
    transition: 1s;
    opacity: 0.6;
  }

`

export const OutlineButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor ?? 'transparent'};
  width: ${props => props.width ?? 'max-content'};
  margin: 10px 5px;
  padding: ${props => props.padding ?? '10px 20px'};
  border-radius: 10px;
  border: ${props => props.border ?? 'none'};
  font-style: ${props => props.fontStyle ?? 'italic'};
  font-weight: ${props => props.fontWeight ?? 'bold'};
  font-size: ${(props) => props.fontSize ?? props.theme.typography.sm};
  cursor: pointer;
  color: ${props => props.color};

  &[disabled] {
    cursor: not-allowed;
    transition: 1s;
    opacity: 0.6;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${props => props.color};
  }

  @media (min-width: 804px) {
    margin: ${props => props.margin ?? 0};
  }
`
