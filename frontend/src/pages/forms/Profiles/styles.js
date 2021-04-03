import styled from 'styled-components';
import { lighten } from 'polished';

//* Cabeçalho do body
export const Body = styled.div`
  padding: 15px 25px;
`;

Body.Button = styled.button`
  width: 75px;
  background: #003464;
  color: #FFF;
  padding: 5px;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${lighten(0.07, '#003464')};
  }
`;
