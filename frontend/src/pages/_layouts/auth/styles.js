import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: auto;
  min-height: 100vh;
  background: #F1F1F1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 20rem;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 1.25rem;

    input {
      background: #FFF;
      border: 0;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
      border-radius: 0.25rem;
      height: 2.75rem;
      padding: 0 1rem;
      color: rgba(0, 0, 0, 0.7);
      margin: 0 0 0.5rem;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    button {
      margin: 0.25rem 0 0;
      height: 2.75rem;
      background: #003464;
      color: #FFF;
      border: 0;
      box-shadow: 0px 2px 4px rgba(0, 52, 100, 0.25);
      border-radius: 0.25px;
      font-size: 1rem;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.07, '#003464')};
      }
    }

    a {
      color: #fff;
      margin-top: 1rem;
      font-size: 1rem;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
