import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  background: #F9F9F9;
  
  button {
    border: 0;
    outline: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin: 20px 0;
    display: flex;
    flex-direction: column;

    input {
      font-size: 14px;
      height: 24px;
      padding: 5px 10px;
      border: 0;
      border-radius: 4px;
      border: 1px solid #eee;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

      &:hover {
        transition: 0.25s;
        background: ${darken(0.03, '#FFF')};
      }
    }

    select {
      font-size: 14px;
      height: 36px;
      padding: 0 5px;
      border-radius: 4px;
      border: 1px solid #eee;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

      &:hover {
        transition: 0.25s;
        background: ${darken(0.03, '#FFF')};
      }
    }

    button {
      color: #FFF;
      padding: 10px 20px;
      border-radius: 4px;
    }
  }
`;

Content.Header = styled.div`
  height: 54px;
`;
