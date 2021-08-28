import { Input } from '@rocketseat/unform';

import { Container } from './styles'

export default function ComponentInput({ prefix, ...props }) {  
  return (
    <Container>
      {prefix && <span>{prefix}</span>}
      <Input { ...props } />
    </Container>
  );
}
