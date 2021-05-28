import styled from 'styled-components';

// * Conteúdo do componente
export const Content = styled.div`
  display: ${props => (props.display)};
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  border-radius: 0.25rem;
  margin-top: ${props => (props.marginTop)};
  background: ${props => (props.background)};
  border: 1px solid ${props => (props.borderColor)};

  p {
    color: ${props => (props.color)};
  }
`;
