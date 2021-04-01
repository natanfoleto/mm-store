import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: auto;
  padding: 15px;
  background: #FFFFFF;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;

Content.Id = styled.div`
  font-size: 32px;
  margin: 0 20px 0 10px;
  padding-right: 20px;
  border-right: 1px solid #ddd;
`;

Content.Name = styled.div`
  font-size: 16px;
  font-weight: bold;

  p {
    font-size: 14px;
    font-weight: normal;
    margin-top: 2px;
  }
`;


