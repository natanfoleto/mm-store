import { Form } from '@rocketseat/unform';

import { Container } from './styles'

export default function ComponentForm({ ...props }) {  
  return (
    <Container>
      <Form { ...props } />
    </Container>
  );
}
