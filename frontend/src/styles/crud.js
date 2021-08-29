import styled from 'styled-components';

//* Cabeçalho do body
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
`;

Body.Title = styled.div`
  margin-bottom: 1.25rem;
  
  h1 {
    font-size: 1.6rem;
    color: #333;
  }

  p {
    font-size: 0.875rem;
    color: #333;
  }
`;
