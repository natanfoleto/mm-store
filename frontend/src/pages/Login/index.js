import { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import Layout from '../_layouts/auth';

import { logIn } from '../../actions/Login';
import { setItem } from '../../utils/LocalStorage';

export default function Login({ history }) {
  const [message, setMessage] = useState('');

  async function handleSubmit({ login, password }) {
    const res = await logIn(login, password);

    if (res.result === 'success') {
      const { usuario, token } = res;

      setItem('auth', { usuario, token });

      history.push('/dashboard');
    }

    if (res.result === 'error') {
      const { message } = res;

      setMessage(message);
    }
  }

  return (
    <Layout>
      <Container>
        <h1>MM STORE</h1>
        <p>{message}</p>

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

          <button type="submit">
              Acessar
          </button>
        </Form>
      </Container>
    </Layout>
  );
}
