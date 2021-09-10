import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;

  select {
    width: 100%;
    font-size: 0.875rem;
    height: 2rem;
    padding: 0 0.25rem;
    border-radius: 0.25px;
    border: 1px solid #eee;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

    &:hover {
      transition: 0.25s;
      background: ${darken(0.03, '#FFF')};
    }
  }
`;
