import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';

import { Container } from './styles'

export default function ComponentNavigation({ currentPage, setCurrentPage, totalPages, totalRecords }) {  
  return (
    <Container>
      <Container.ButtonNavigation
        disabled={currentPage <= 1}
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }} 
      > 
        <CgPlayTrackPrev size={22} /> 
      </Container.ButtonNavigation>
        
      <Container.SpanNavigation>
        Page <strong>{currentPage}</strong> of <strong>{totalPages ? totalPages : 1}</strong>
        <br />
        <strong>{totalRecords}</strong> registro(s) encontrado(s)
      </Container.SpanNavigation>

      <Container.ButtonNavigation
        disabled={currentPage >= totalPages}
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }} 
      > 
        <CgPlayTrackNext size={22} /> 
      </Container.ButtonNavigation>     
    </Container>
  );
}
