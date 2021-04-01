import { useEffect, useState, useCallback } from 'react';
import { Content, Header, Table, Navigation } from './styles';

const Head = ({ keys, headers }) => {
  const tableHead = headers || {}
  return (
    <Table.THead>
      <Table.Tr>
        { keys.map(key => <Table.Th key={key}>{tableHead[key] || key}</Table.Th>) }
      </Table.Tr>
    </Table.THead>
  )
}

const Body = ({ data, setRowSelected }) => {
  return (
    <Table.TBody>
      {
        data.map((record, index) => {
          const keys = Object.keys(record);

          return (
            <Table.Tr 
              key={index} 
              onClick={async (e) => {
                const rowTarget = e.currentTarget.children;

                let row = {};

                for (let i = 0; i < keys.length; i++) 
                  row[keys[i]] = rowTarget[i].outerText;
                
                setRowSelected(row);
              }}
            >
              { 
                keys.map(key => 
                  <Table.Td 
                    key={key} 
                  >
                    {record[key]}
                  </Table.Td>
                ) 
              }
            </Table.Tr>
          )
        })
      }
    </Table.TBody>
  )
}

const Footer = ({ pages, currentPage, setCurrentPage }) => {
  return (
    <Navigation>
      <Navigation.Button 
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage > 1 ? false : true}
      >
        Previous
      </Navigation.Button>

      <Navigation.Button 
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage < pages.length ? false : true}
      >
        Next
      </Navigation.Button>
    </Navigation>
  )
}

export default function ComponentTable({ functionLoad, headers }) {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [total, setTotal] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowSelected, setRowSelected] = useState({});

  useEffect(() => {
    loadData();
  }, [pages])

  async function loadData() {
    const { data } = await functionLoad(currentPage, limit);

    setData(data.data)
    setKeys(Object.keys(data.data[0]));
    setTotal(data.total);

    const totalPages = Math.ceil(total / limit);

    const arrayPages = [];

    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);
    setTotalPages(totalPages);
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return (
    <>
      <Header>
        <Header.Input placeholder="Pesquise pelo nome"/>

        <Header.Pagination>
          <Header.Span>
            Page <input 
              type="number" 
              name="currentPage" 
              value={currentPage} 
              onChange={(e) => {
                e.target.value >= totalPages ? setCurrentPage(totalPages) : setCurrentPage(e.target.value)
                || e.target.value <= 1 ? setCurrentPage(1) : setCurrentPage(e.target.value)
              }} 
            /> of {totalPages}
          </Header.Span>

          <Header.Select onChange={handleLimit}>
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="30">30 rows</option>
            <option value="50">50 rows</option>
            <option value="100">100 rows</option>
          </Header.Select>
        </Header.Pagination> 
      </Header>

      <Content>
        { data &&
          <>
            <Table>
              <Head keys={keys} headers={headers} />
              <Body data={data} setRowSelected={setRowSelected} />
            </Table>
          </>
        }
      </Content>
      
      <Footer
        pages={pages} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
  </>
  );
}
