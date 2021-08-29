import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

Container.Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

Container.ButtonNavigation = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
`;

Container.SpanNavigation = styled.span`
  text-align: center;
`;
