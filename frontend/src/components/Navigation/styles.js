import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  select {
    border-radius: 3px;
    height: auto;
  }
`;

Container.Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

Container.ButtonNavigation = styled.button`
  display: flex;
  align-items: center;
  padding: 0.25rem 1rem;
  background: #FFFFFF;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

Container.SpanNavigation = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
