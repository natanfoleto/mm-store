import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 38rem;
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;

    button {
      color: #FFF;
      padding: 0.5rem 1.25rem;
      border-radius: 0.25rem;
    }
  }
`;

Container.Header = styled.div`
  height: 3.25rem;
`;

