import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;

  form {
    height: 100%;
    width: 40vw;
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

