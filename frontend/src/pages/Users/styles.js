import styled from 'styled-components';
import { lighten, darken } from 'polished';

//* Cabeçalho do body
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
`;

Body.Title = styled.div`
  margin-bottom: 20px;
  
  h1 {
    font-size: 26px;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #333;
  }
`;

Body.Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

Body.Filter = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #555;
    margin: 0 0 0 10px;
  }

  select {
    color: #777;
    font-size: 14px;
    padding: 5px;
    margin: 0 10px;
    border-radius: 2px;
    border: 0;
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

    &:hover {
      transition: 0.25s;
      color: #000;
      background: ${darken(0.03, '#FFF')};
    }
  }
`;

Body.Button = styled.button`
  background: #003464;
  color: #FFF;
  padding: 0 30px;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${lighten(0.07, '#003464')};
    transition: 0.25s;
  }
`;

Body.Input = styled.input`
  font-size: 14px;
  width: 400px;
  padding: 5pX 10px;
  border: 0;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

  &:hover {
    transition: 0.25s;
    background: ${darken(0.03, '#FFF')};
  }
`;

//* Dados do banco de dados renderizados
Body.Data = styled.div`
  height: 600px;
  overflow-y: scroll;
  margin-bottom: 15px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-radius: 4px;

  ::-webkit-scrollbar { width: 0; }

  @media (max-height: 900px) {
    height: 450px;
  }
`;

Body.LoadData = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//* Navegação dos dados renderizados
Body.Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

Body.ButtonNavigation = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
`;

Body.SpanNavigation = styled.span`
`;
