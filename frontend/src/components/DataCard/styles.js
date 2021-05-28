import styled from 'styled-components';
import { darken } from 'polished';

// * Conteúdo do componente
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.625rem;
  height: auto;
  padding: 0.75rem;
  background: #FFF;
  border: 1px solid #eee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }  

  &:hover {
    transition: 0.25s;
    background: ${darken(0.025, '#FFF')};
  }
`;
