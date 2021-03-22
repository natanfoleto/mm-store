import React from 'react';

import Layout from '../_layouts/default';
import useProfile from '../../hooks/useProfile';

import { Container, Header, Table, Footer } from './styles';

export default function Perfils() {
  const { profiles, loading, error, searchProfiles } = useProfile()

  async function handleButton() {
    await searchProfiles()

    console.log(profiles)
  }

  return (
    <Layout>
      <Container>
        <Header>
          <h1>Perfils</h1>
        </Header>

        <Table>
          
        </Table>

        <Footer>
          <button onClick={handleButton}>
            Buscar
          </button>
        </Footer>
      </Container>
    </Layout>
  );
}
 