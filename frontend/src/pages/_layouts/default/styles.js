import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  background: #F1F1F1;
`;

export const Content = styled.div`
  width: 100vw;
  padding: 20px;

  button {
    margin: 0 5px;
    padding: 10px;
    border: 0;
    border-radius: 4px;
    outline: 0;

    &:hover {
      opacity: 0.8;
    }
  }
`;