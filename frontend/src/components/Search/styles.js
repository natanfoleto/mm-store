import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

export const Input = styled.input`
  font-size: 0.875rem;
  width: 25rem;
  padding: 0.3rem 0.65rem;
  border: 0;
  border-radius: 0.25rem;
  border: 1px solid #eee;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

  &:hover {
    transition: 0.25s;
    background: ${darken(0.03, '#FFF')};
  }
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #555;
    margin: 0 0 0 0.5rem;
  }

  select {
    color: #777;
    font-size: 0.875rem;
    padding: 0.25rem;
    margin: 0 0.5rem;
    border: 0;
    border-radius: 0.25rem;
    border: 1px solid #eee;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

    &:hover {
      transition: 0.25s;
      color: #000;
      background: ${darken(0.03, '#FFF')};
    }
  }
`;
