import styled from 'styled-components';

// * Conteúdo do componente
export const Data = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

Data.Actions = styled.div`
  display: flex;
  align-items: center;
`;

Data.Button = styled.a`
  color: #333;
  font-size: 0.875rem;
  margin: 0 0.875rem;
  cursor: pointer;

  &:hover {
    color: #003464;
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

Data.Hr = styled.hr`
  height: 1rem;
  border: 1px solid #ddd;
`;

Data.Id = styled.p`
  font-size: 2rem;
  margin: 0 1.25rem 0 0.875rem;
  padding-right: 1.25rem;
  border-right: 1px solid #ddd;
`;


Data.DivColumn = styled.div`
  margin-right: 1rem;
  padding-right: 1.25rem;
  border-right: 1px solid #ddd;

  &:last-child {
    padding-right: 0;
    border-right: 0;
  }

  h1 {
    font-size: 1rem;
    color: #333;
  }

  p {
    color: #333;
    font-size: 0.8rem;
    font-weight: normal;
    margin-top: 3px;
    margin-right: 0.25rem;
  }
`;

Data.DivRow = styled.div`
  display: flex;
`;
