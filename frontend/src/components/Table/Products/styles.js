import styled from 'styled-components';

export const PhotoContainer = styled.div`
  img {
    height: 150px;
    width: 150px;
    padding: 0.5rem 0.25rem 0.25rem;
    max-width: 100%;
    -moz-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;

    &:hover {
      cursor: pointer;
      -moz-transform: scale(1.1);
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
`;
