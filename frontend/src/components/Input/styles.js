import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 100%;
    font-size: 0.875rem;
    height: 1.5rem;
    padding: 0.25rem 0.5rem;
    border: 0;
    border: 1px solid #eee;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

    &:hover {
      transition: 0.25s;
      background: ${darken(0.03, '#FFF')};
    }
  }

  span {
    display: flex;
    align-items: center;
    background: #eee;
    color: #444;
    font-size: 0.875rem;
    height: 1.5rem;
    padding: 0.25rem 0.4rem;
    border: 0;
    border: 1px solid #eee;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }
`;
