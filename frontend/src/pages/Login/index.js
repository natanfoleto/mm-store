import { useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import Layout from '../_layouts/auth';

export default function Login() {
  const history = useHistory();

  async function handleLogin() {
    history.push('/dashboard');
  }

  return (
    <Layout>
        <h1>MM STORE</h1>

        <Form onSubmit={() =>{}}>
          <Input 
            name="email" 
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

          <button onClick={handleLogin} type="button">
              Acessar
          </button>
        </Form>
    </Layout>
  );
}
