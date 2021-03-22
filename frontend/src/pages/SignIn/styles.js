import styled from 'styled-components';

export const Container = styled.div`
  img {
    height: 130px;
    width: 320px;
    margin-bottom: 10px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${props => (props.loggingIn ? 'not-allowed' : 'pointer')}; 
    
    img {
      background-color:red;
      width: 44px;
      height: 44px;
    }
  }
`;