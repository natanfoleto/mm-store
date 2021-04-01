import styled from 'styled-components';
import { darken, lighten } from 'polished';

// * Content da página * //
export const Content = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;

  ::-webkit-scrollbar { width: 0; }
`;

// * Header para navegação da tabela * //
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

Header.Input = styled.input`
  width: 300px;
  padding: 5px;
  border-radius: 2px;
  border: 1px solid #DFE1E6;

  &:hover {
    background: ${lighten(0.07, '#DFE1E6')};
  }
`;

Header.Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;

Header.Span = styled.span`
  margin-right: 15px;

  input {
    width: 40px;
    padding: 5px;
    border-radius: 2px;
    border: 1px solid #DFE1E6;
  }
`;

Header.Select = styled.select`
  padding: 5px;
  border-radius: 2px;
  border: 1px solid #DFE1E6;
`;

// * Tabela da página * //
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
`;

Table.THead = styled.thead`

`;

Table.Th = styled.th`
  padding: 10px;
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #DFE1E6;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;

  &:hover {
    cursor: pointer;
    transition: 0.25s;
    background: ${lighten(0.05, '#DFE1E6')};
  }
`;

Table.TBody = styled.tbody`

`;

Table.Tr = styled.tr`
  &:hover {
    cursor: pointer;
    transition: 0.25s;
    background: ${lighten(0.05, '#DFE1E6')};
  }
`;

Table.Td = styled.td`
  padding: 10px;
  width: 100px;
`;

// * Footer para a navegação da tabela * //
export const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #DFE1E6;
`;

Navigation.Button = styled.button`
  background: #003464;
  color: #FFF;
  width: 10%;
  padding: 8px;

  cursor: pointer;

  &:hover {
    background: ${darken(0.05, '#003464')};
  }
`;
