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

  nav {
    display: flex;
    align-items: center;

    img {
      height: 1.5rem;
      width: 3.5rem;
      margin-right: 1rem;
      padding-right: 1.25rem;
      border-right: 1px solid #ddd;

      &:hover {
        cursor: pointer;
      }
    }

    a {
      margin: 0 0.25rem;
      padding: 0.5rem;
      border-radius: 2px;
      color: #003464;

      &:hover {
        color: #0052CC;
        background: #E8F1FF;
        transform: 2s;
      }
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