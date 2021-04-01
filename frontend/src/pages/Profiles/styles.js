import styled from 'styled-components';
import { lighten, darken } from 'polished';

//* Cabeçalho do body
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

Body.Title = styled.h1`
  margin-bottom: 20px;
`;

Body.Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

Body.Filter = styled.div`
  display: flex;
`;

Body.Button = styled.button`
  background: #003464;
  color: #FFF;
  padding: 0 30px;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${lighten(0.07, '#003464')};
  }
`;

Body.Input = styled.input`
  width: 400px;
  height: 24px;
  padding: 5px;
  border: 0;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    transition: 0.25s;
    background: ${darken(0.03, '#FFF')};
  }
`;

Body.Select = styled.select`
  color: #777;
  font-size: 14px;
  padding: 5px;
  margin: 0 10px;
  border-radius: 2px;
  border: 0;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    transition: 0.25s;
    color: #000;
    background: ${darken(0.03, '#FFF')};
  }
`;

//* Dados do banco de dados renderizados
export const Data = styled.div`
  height: 600px;
  overflow-y: scroll;
  margin-bottom: 15px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-radius: 4px;

  ::-webkit-scrollbar { width: 0; }
`;

//* Navegação dos dados renderizados
export const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

Navigation.Button = styled.button`
  padding: 10px 20px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
`;

Navigation.Span = styled.span`
`;
