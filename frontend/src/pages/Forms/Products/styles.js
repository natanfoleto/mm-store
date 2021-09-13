import styled from 'styled-components';

export const ImageGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const ImageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  label {
    position: relative;
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444;
    cursor: pointer;
  }

  input[type="file"] {
    display: none;
  }
`;

export const Images = styled.div`
  display: flex;
  gap: 0.75rem;
  height: 100px;
  width: 100% - 0.75rem;
  padding: 0.75em;
  border: 1px solid #ddd;
  overflow-y: scroll;

  img {
    width: 100px;
    height: 100px;
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
