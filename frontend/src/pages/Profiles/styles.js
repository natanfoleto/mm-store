import styled from 'styled-components';
import { lighten } from 'polished';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

Body.Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  p {
    font-size: 24px;
    color: #172B4D;
  }
`;

Body.Button = styled.button`
  background: #003464;
  color: #FFF;
  padding: 10px 30px;
  border-radius: 2px;

  &:hover {
    background: ${lighten(0.07, '#003464')};
  }
`;

Body.Table = styled.div`
  display: flex;
  flex-direction: column;
`;
