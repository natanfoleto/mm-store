import styled from 'styled-components';
import { lighten, darken } from 'polished';

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

Body.Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

Body.Filter = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #555;
    margin: 0 0 0 0.5rem;
  }

  select {
    color: #777;
    font-size: 0.875rem;
    padding: 0.25rem;
    margin: 0 0.5rem;
    border: 0;
    border-radius: 0.25rem;
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
  padding: 0 2rem;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${lighten(0.07, '#003464')};
    transition: 0.25s;
  }
`;

Body.Input = styled.input`
  font-size: 0.875rem;
  width: 25rem;
  padding: 0.3rem 0.65rem;
  border: 0;
  border-radius: 0.25rem;
  border: 1px solid #eee;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

  &:hover {
    transition: 0.25s;
    background: ${darken(0.03, '#FFF')};
  }
`;

//* Dados do banco de dados renderizados
Body.Data = styled.div`
  height: 36rem;
  overflow-y: scroll;
  margin-bottom: 1rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-radius: 0.25rem;

  ::-webkit-scrollbar { width: 0; }

  @media (max-height: 900px) {
    height: 28rem;
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
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
`;

Body.SpanNavigation = styled.span`
  text-align: center;
`;
