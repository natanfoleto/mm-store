import styled from 'styled-components';

export const Content = styled.div`
  height: auto;
  min-height: 100vh;

  .pro-sidebar-layout {
    background: #003464;
  }

  .pro-icon {
    background: #003464;
  }

  svg {
    color: #D1D1D1;
  }

  .pro-item-content {
    color: #D1D1D1;
  }

  /* nav {

  }

  .pro-inner-item {
    
  } */
`;

export const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  background: #032449;

  button {
    border: 0;
    outline: 0;
    color: #D1D1D1;
    
    background: transparent;

    &:hover {
      color: #D1D1D1;
    }
  }

  a {
    color: #D1D1D1;
    margin-left: 20px;

    &:hover {
      color: #D1D1D1;
    }
  }
`;

export const Footer = styled.div`
  height: auto;
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: ${props => (props.toggleMenu ? 'center' : 'space-between')}; 
    width: 50px;
    border: 0;
    background-color: transparent;
    color: #D1D1D1;
    
    &:hover {
      color: #D1D1D1;
    }
  }
`;

