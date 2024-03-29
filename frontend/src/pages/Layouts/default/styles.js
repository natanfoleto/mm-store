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
    outline: 0;
  }
`;

export const Container = styled.div`
  max-height: 92.5vh;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  background: ${props => (props.background)};

  ::-webkit-scrollbar { width: 0; }
`;
