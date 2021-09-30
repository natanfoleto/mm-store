import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  padding: 1rem 1.75rem;

  form {
    width: 50vw;
    display: flex;
    flex-direction: column;
    background: #FFF;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.75rem;

    button {
      color: #FFF;
      padding: 0.5rem 1.25rem;
      border: 0;
      border-radius: 0.25rem;
    }
  }
`;
