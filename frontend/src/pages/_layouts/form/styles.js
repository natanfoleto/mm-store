import styled from 'styled-components';
import { darken, lighten } from 'polished';

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

    button {
      width: 75px;
      background: #003464;
      color: #FFF;
      padding: 5px;
      margin-top: 10px;
      border-radius: 4px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

      &:hover {
        background: ${lighten(0.07, '#003464')};
      }
    }
  }
`;
