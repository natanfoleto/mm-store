import styled from 'styled-components';
import { darken } from 'polished';

// * Conteúdo do componente
export const Button = styled.button`
  background: transparent;

  &:hover {
    color: ${darken(0.025, '#000')};
  }
`;

