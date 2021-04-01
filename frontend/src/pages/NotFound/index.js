import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/404.svg';

export default function NotFound() {
  return (
    <Container>
      <p>The page you are looking for, not be found</p>
      <img src={Logo} alt="404 not found" />
      <Link to="/">Voltar ao início</Link>
    </Container>
  );
}
