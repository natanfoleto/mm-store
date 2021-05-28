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
  width: 44rem;
  padding: 3rem 1.5rem;

  h1 {
    font-size: 2rem;
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
  margin-top: 1rem;
`;

IGroup.Label = styled.label`
  color: #444;
  margin-bottom: 2px;
`;

export const BGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
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
  margin-top: 1.5rem;

  .pd-id {
    width: 0px;
  }

  .pd-description {
    width: 22rem;
    text-align: left;
  }

  .pd-type {
    width: 3rem;
    text-align: center;
  }

  .pd-context {
    width: 7.875rem;
    text-align: left;
  }

  .pd-delete {
    width: 1.25rem;
    text-align: right;
    padding: 0 0.25rem 0 0;

    &:hover {
      cursor: pointer;
    }
  }
`;

Permissions.All = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  select {
    color: #333;
    background: #F7F7F7;
    margin-top: 0.25rem;
    border-bottom: 1px solid #ddd !important;
    border-radius: 0px !important;
    height: 1.5rem !important;
    box-shadow: 0px 0px 0px rgba(255, 255, 255, 1) !important;
  }

  .pd-description {
    width: 22rem;
    text-align: left;
  }

  .pd-type {
    width: 7.875rem;
    text-align: left;
  }

  .pd-context {
    width: 7.875rem;
    text-align: left;
  }
`;

Permissions.Ph = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0.25rem 0 0.25rem 0.25rem;
  margin: 0.25rem 0; 
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
  padding: 0.25rem 0 0.25rem 0.25rem;
  margin-top: 0.25rem; 
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
  margin-top: 1rem;
  background: #F7F7F7;
  color: #333 !important;
  border-bottom: 1px solid #ddd !important;
  border-radius: 2px !important;
  padding: 0.25rem 0 !important;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 1) !important;
`;
