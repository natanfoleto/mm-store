import { Form, Input } from '@rocketseat/unform';

import Layout from '../_layouts/auth';

import history from '../../services/history';

export default function Login() {
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

          <button 
            onClick={() => {
              history.push('/dashboard');
            }} 
            type="submit"
          >
              Acessar
          </button>
        </Form>
    </Layout>
  );
}
