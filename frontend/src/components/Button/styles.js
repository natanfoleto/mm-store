import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  padding: 0.3rem 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
  background: ${props => (props.background)};
  color: ${props => (props.color)};
  border: ${props => (props.border)};
  font-size: ${props => (props.fontSize)};
  font-weight: ${props => (props.fontWeight)};

  &:hover {
    background: ${props => (darken(0.04, props.background))};
    transition: 0.15s;
  }
`;
