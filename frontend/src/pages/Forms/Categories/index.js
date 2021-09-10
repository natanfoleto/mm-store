import { useEffect, useState } from 'react'; 

import { useHistory } from 'react-router-dom';

import Layout from '../../Layouts/default';

import categoryService from '../../../services/api/category'

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'

import { Container, Title, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormCategory() {
  const history = useHistory();

  const { createCategory, updateCategory } = categoryService();

  const [category, setCategory] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    setCategory(history.location.state);

    if (history.location.pathname === '/categorias/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');
    }
  }, [history])

  async function handleSubmit(data) {
    if (operation === 'ADD') {
      delete data.id_categoria;

      await createCategory(data)
    } else {
      await updateCategory(data);
    }
  }

  function handleCancel() {
    history.goBack()
  }

  return (
    <Layout title={operation === 'ADD' ? 'Nova categoria' : `Editando: ${category && category.nome}`}>
      <Container>
        <Form initialData={category} onSubmit={handleSubmit} autoComplete="off">
          <Title>
            <h1> { operation === 'ADD' ? 'Nova categoria' : 'Editar categoria' }</h1>
          </Title>
          
          <Input 
            type="text" 
            name="id_categoria"
            hidden={true}
          />
          
          <InputGroup>
            <Label>Nome</Label>

            <Input 
              type="text" 
              name="nome"
              maxLength={100}
              onChange={() => { setButtonAvailable(false) }}
              required
            />
          </InputGroup>

          <ButtonGroup>
            <Button
              type="submit"
              background="#0052CC"
              color="#FFF"
              disabled={buttonAvailable}
            >
              Salvar
            </Button>

            <Button
              type="button"
              background="#FFF"
              color="#777"
              border="1px solid #ccc"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </Container>
    </Layout>
  );
}
 