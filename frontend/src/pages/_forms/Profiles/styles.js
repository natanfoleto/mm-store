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
  width: 700px;
  padding: 50px 25px;

  h1 {
    font-size: 34px;
    text-align: right;
  }

  p {
    text-align: right;
  }

  h2 {
    text-align: left;
  }
`;

Container.Title = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 20px;
`;

BGroup.Button = styled.button`
  background: ${props => (props.color)};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${props => (lighten(0.04, props.color))};
    transition: 0.15s;
  }
`;

export const Permissions = styled.div`
  display: flex;
  flex-direction: column;
`;

Permissions.Label = styled.label`
  color: #444;
  margin-bottom: 2px;
`;

Permissions.Current = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .pd-id {
    width: 0px;
  }

  .pd-description {
    width: 350px;
    text-align: left;
  }

  .pd-type {
    width: 50px;
    text-align: center;
  }

  .pd-context {
    width: 125px;
    text-align: left;
  }

  .pd-delete {
    width: 20px;
    text-align: right;

    &:hover {
      cursor: pointer;
    }
  }
`;

Permissions.All = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  select {
    color: #333;
    background: #F7F7F7;
    margin-top: 4px;
    border-bottom: 1px solid #ddd !important;
    border-radius: 0px !important;
    height: 26px !important;
    box-shadow: 0px 0px 0px rgba(255, 255, 255, 1) !important;
  }

  .pd-description {
    width: 350px;
    text-align: left;
  }

  .pd-type {
    width: 125px;
    text-align: left;
  }

  .pd-context {
    width: 125px;
    text-align: left;
  }
`;

Permissions.Ph = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 5px;
  margin: 5px 0; 
  background: #F7F7F7;
  border-radius: 3px;

  p {
    font-weight: bold;
  }
`;

Permissions.Pr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 3px 5px;
  margin-top: 4px; 
  background: #F7F7F7;
  border-radius: 3px;
`;

Permissions.Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
`;

Permissions.Pd = styled.p`
`;

Permissions.Button = styled.button`
  margin-top: 15px;
  background: #F7F7F7;
  color: #333 !important;
  border-bottom: 1px solid #ddd !important;
  border-radius: 2px !important;
  padding: 5px 0 !important;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 1) !important;
`;
