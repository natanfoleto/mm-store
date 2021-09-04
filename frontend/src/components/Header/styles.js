import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  padding: 0 2rem;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 4rem;
  max-width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 1.5rem;
    width: 3.5rem;
    margin-right: 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  aside {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      color: #333;
      
      &:hover {
        color: #555;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 1rem;
  padding-left: 1.25rem;
  border-left: 1px solid #ddd;

  div {
    text-align: right;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 0.75rem;
      color: #999;
    }
  }
`;