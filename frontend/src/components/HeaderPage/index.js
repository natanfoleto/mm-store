import Button from '../Button'

import { Container } from './styles'

export default function ComponentHeaderPage({ children, handleCreate, buttonText }) {  
  return (
    <Container>
      <h1> {children} </h1>

      <Button 
        onClick={handleCreate}
        background="#0052CC"
        color="#FFF"
      >
        {buttonText}
      </Button>
    </Container>
  );
}
