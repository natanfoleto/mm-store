import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 4rem);
  width: ${props => props.sidebar ? '0vw' : '15vw'};
  padding: ${props => props.sidebar ? '0 0.75rem 0 2rem' : '0'};
  background: #FAFBFC;
  border-right: 1px solid #ddd;

  @media (max-height: 1200px) {
    width: ${props => props.sidebar ? '0vw' : '12.5vw'};
  }

  @media (max-height: 900px) {
    width: ${props => props.sidebar ? '0vw' : '17.5vw'};
  }

  nav {
    display: ${props => props.sidebar ? 'none' : 'flex'};
    flex-direction: column;
    margin: 1rem 0.25rem;

    a {
      display: flex;
      align-items: center;
      font-size: 1rem;
      margin: 0 0.25rem;
      padding: 0.6rem;
      border-radius: 2px;
      color: #003464;

      svg {
        margin-right: 10px;
      }

      &:hover {
        color: #0052CC;
        background: #EBECF0;
        transform: 2s;
      }
    }

    .selected {
      color: #0052CC;
      background: #EBECF0;
    }
  }

  footer {
    text-align: center;
    margin-bottom: 1rem;
  }

  &:hover {
    button {
      display: flex;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  height: auto;
  min-height: 2rem;
  width: ${props => props.sidebar ? '0%' : '100%'};

  div {
    display: ${props => props.sidebar ? 'none' : 'flex'};
    flex-direction: column;
    margin-left: 1rem;

    h1 {
      font-weight: 400;
      font-size: 1rem;
    }

    padding-bottom: 0.5rem;
  }

  button {
    position: relative;
    left: ${props => props.sidebar ? '0' : '0.75rem'};
    display: ${props => props.sidebar ? 'flex' : 'none'};
    background: #FFF;
    padding: 0.05rem;
    border: 1px solid #ddd !important;
    border-radius: 50%;

    &:hover {
      background: #2584FF;
      color: #FFF;
      transition: 0.25s;
    }
  }
`;
