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

      span {
        font-size: 18px;
      }
    }
  }

  td>div {
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  thead>tr>th {
    background: #DDD;
    padding: 2.5px 7px;
    font-weight: 600;
  }

  tbody>tr>td {
    padding: 5px 7px;
  }
`;

export const styleIcon = { 
  fontSize: '14px', 
  border: '1px solid #ddd',
  borderRadius: '0.25rem',
  padding: '0.25rem', 
  margin: '0 0.15rem'
}
