import styled from 'styled-components';
import { lighten } from 'polished';

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

export const Container = styled.div`
  width: 600px;
  padding: 50px 25px;

  h1 {
    font-size: 34px;
  }
`;

Container.Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-bottom: 10px;
`;

export const IGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

IGroup.Label = styled.label`
  color: #444;
  margin-bottom: 2px;
`;

export const BGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

BGroup.Button = styled.button`
  background: ${props => (props.color)};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${props => (lighten(0.04, props.color))};
    transition: 0.15s;
  }
`;

