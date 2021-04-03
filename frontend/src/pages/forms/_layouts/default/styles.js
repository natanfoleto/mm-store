import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  form {
    margin: 20px 0;
    display: flex;
    flex-direction: column;

    input {
      font-size: 14px;
      width: 400px;
      padding: 5pX 10px;
      border: 0;
      border-radius: 4px;
      border: 1px solid #eee;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

      &:hover {
        transition: 0.25s;
        background: ${darken(0.03, '#FFF')};
      }
    }
  }
`;
