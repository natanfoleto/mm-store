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
  max-width: 320px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
      background: #FFF;
      border: 0;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: rgba(0, 0, 0, 0.7);
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #003464;
      color: #FFF;
      border: 0;
      box-shadow: 0px 2px 4px rgba(0, 52, 100, 0.25);
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.07, '#003464')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
