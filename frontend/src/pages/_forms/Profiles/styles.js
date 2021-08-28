import styled from 'styled-components';

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
