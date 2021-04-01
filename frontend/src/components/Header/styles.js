import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  padding: 0 30px;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 25px;
      width: 55px;
      margin-right: 15px;
      padding-right: 20px;
      border-right: 1px solid #eee;

      &:hover {
        cursor: pointer;
      }
    }

    a {
      margin: 0 4px;
      padding: 7px;
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
  margin-left: 15px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
`;