import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  background: #FFF;
  overflow-y: scroll;

  ::-webkit-scrollbar { width: 0; }
  
  button {
    border: 0;
    outline: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
`;
