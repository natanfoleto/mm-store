import { Select } from '@rocketseat/unform';

import { Container } from './styles'

export default function ComponentSelect({ ...props }) {  
  return (
    <Container>
      <Select { ...props } />
    </Container>
  );
}
