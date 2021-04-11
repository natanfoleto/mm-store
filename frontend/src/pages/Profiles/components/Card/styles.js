import styled from 'styled-components';

// * Conteúdo do componente
export const Data = styled.div`
  display: flex;
  align-items: center;
`;

Data.Actions = styled.div`
  display: flex;
  align-items: center;
`;

Data.Button = styled.a`
  color: #333;
  font-size: 13px;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    color: #003464;
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

Data.Hr = styled.hr`
  height: 16px;
  border: 1px solid #ddd;
`;

Data.Id = styled.p`
  font-size: 32px;
  margin: 0 20px 0 10px;
  padding-right: 20px;
  border-right: 1px solid #ddd;
`;

Data.Name = styled.div`
  font-size: 16px;
  font-weight: bold;

  p {
    font-size: 13px;
    font-weight: normal;
    margin-top: 4px;
  }
`;


