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
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;

    input {
      font-size: 0.875rem;
      height: 1.5rem;
      padding: 0.25rem 0.5rem;
      border: 0;
      border-radius: 0.25rem;
      border: 1px solid #eee;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

      &:hover {
        transition: 0.25s;
        background: ${darken(0.03, '#FFF')};
      }
    }

    select {
      font-size: 0.875rem;
      height: 2.15rem;
      padding: 0 0.25rem;
      border-radius: 0.25px;
      border: 1px solid #eee;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

      &:hover {
        transition: 0.25s;
        background: ${darken(0.03, '#FFF')};
      }
    }

    button {
      color: #FFF;
      padding: 0.5rem 1.25rem;
      border-radius: 0.25rem;
    }
  }
`;

Content.Header = styled.div`
  height: 3.25rem;
`;
