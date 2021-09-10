import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: scroll;
  margin-bottom: 2rem;

  ::-webkit-scrollbar { width: 0; }

  h6 {
    color: #333;
  }

  div {
    padding: 0;

    input {
      width: 15vw;
    }

    button {
      padding: 0;

      &:hover {
        background: none;
      }
    }
  }

  td>div {
    justify-content: space-between;
    padding: 0 1rem;
  }

  thead>tr>th {
    background: #DDD;
    padding: 2.5px 7px;
    font-weight: 600;
  }

  tbody>tr>td {
    padding: 5px 7px;
  }

  tbody>tr:nth-child( 2n + 2 ) {
	  background: #F7F7F7;
  }

  tbody>tr {
    &:hover {
      cursor: pointer;
      background: rgba(0, 82, 204, 0.2);
      // background: rgba(255, 249, 82, 0.8);
    }
  }
`;
