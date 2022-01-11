import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 200px;
  margin-top: 1rem;
  background: #F9F9F9;
  border-radius: 5px;
  border-right: 3px solid #0052CC;

  div {
    margin-left: 20px;

    h1 {
      font-size: 20px;
      margin-bottom: 5px;
    }

    p {
      font-size: 16px;
    }
  }

  svg {
    margin-right: 30px;
  }
`;

export const Wishs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
`;

export const WishTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  p {
    margin-left: 5px;
  }

  button {
    color: #333 !important;
    background: transparent;
  }
`;

export const Wish = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  p {
    margin-left: 5px;
  }

  button {
    padding: 0 !important;
    color: #333 !important;
    background: transparent;
  }
`;
