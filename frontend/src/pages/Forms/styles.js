import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;

  h1 {
    font-size: 1.5rem;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 1rem;
`;

export const Grouping = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 1rem;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const Label = styled.label`
  color: #444;
  margin-bottom: 4px;
`;
