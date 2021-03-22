import Layout from '../_layouts/default';

import { Container, CardContainer, Card } from './styles';

export default function Dashboard({ history }) {
  return (
    <Layout>
      <Container>
        <CardContainer>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </CardContainer>
      </Container>
    </Layout>
  );
}
