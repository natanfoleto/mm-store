import styled from 'styled-components';

export const Container = styled.div`
  img {
    height: 8rem;
    width: 20rem;
    margin-bottom: .05rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${props => (props.loggingIn ? 'not-allowed' : 'pointer')}; 
    
    img {
      background-color:red;
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;