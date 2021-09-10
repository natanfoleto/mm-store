import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';

import Select from '../Select'

import { comboboxRows } from '../../constants/array'

import { Container } from './styles'

export default function ComponentNavigation({ currentPage, setCurrentPage, totalPages, totalRecords, viewPermission, limit, handleLimit }) {  
  return (
    <Container>
      <Container.ButtonNavigation
        disabled={currentPage <= 1}
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }} 
      > 
        <CgPlayTrackPrev size={20} /> 
      </Container.ButtonNavigation>
        
      <Container.SpanNavigation>
        <p>
          Página <strong>{currentPage}</strong> de <strong>{totalPages ? totalPages : 1}</strong> 
          &nbsp; | <strong>{totalRecords}</strong> registro(s) encontrado(s)
        </p>

        &nbsp; | &nbsp;

        <Select 
          name="rows"
          options={comboboxRows}
          onChange={handleLimit}
          disabled={viewPermission}
          placeholder={`${limit} rows`}
        />
      </Container.SpanNavigation>

      <Container.ButtonNavigation
        disabled={currentPage >= totalPages}
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }} 
      > 
        <CgPlayTrackNext size={20} /> 
      </Container.ButtonNavigation>     
    </Container>
  );
}
