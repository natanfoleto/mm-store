import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  background: ${props => (props.background)};
  color: ${props => (props.color)} !important;
  border: ${props => (props.border ? props.border : 0)} !important;
  padding: 0.3rem 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${props => (darken(0.04, props.background))};
    transition: 0.15s;
  }
`;
