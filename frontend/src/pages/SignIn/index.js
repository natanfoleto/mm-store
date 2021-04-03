import Layout from '../_layouts/auth';
import Logo from '../../assets/Logo.png';

import { Form, Input } from '@rocketseat/unform';
import { useAuth } from '../../contexts/auth';
import { Container } from './styles';

export default function Login() {
  const { signIn, loggingIn } = useAuth();

  async function handleSubmit({ login, password }) {
    await signIn(login, password); 
  }

  return (
    <Layout>
      <Container>
        <img src={Logo} alt='Logo' />

        <Form onSubmit={handleSubmit}>
          <Input 
            name="login" 
            type="text" 
            placeholder="Seu login" 
            autoComplete="off" 
            required
          />
          <Input 
            name="password" 
            type="password" 
            placeholder="Sua senha secreta" 
            autoComplete="off" 
            required
          />

          <button type="submit" disabled={loggingIn}>
            {loggingIn ? '...' : 'Acessar'}
          </button>
        </Form>
      </Container>
    </Layout>
  );
}
