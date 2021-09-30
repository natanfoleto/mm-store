import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.2rem;
    padding-left: 10px;
    border-left: 2px solid blue;
    color: #555;
  }
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
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const Label = styled.label`
  color: #444;
  margin: 0 0 4px 5px;

  button {
    font-size: 12px;
    color: #666 !important;
    padding: 0 5px !important;
  }
`;

export const Footer = styled.label`
  width: 50vw;
  padding: 0 1.75rem 1rem 1.75rem;
  background: #FFF;
`;
