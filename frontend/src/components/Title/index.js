import { Container } from './styles'

export default function ComponentTitle({ title, subTitle }) {  
  return (
    <Container>
      <h1> {title} </h1>
      <p> {subTitle} </p>
    </Container>
  );
}
