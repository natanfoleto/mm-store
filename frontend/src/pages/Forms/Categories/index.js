import { useEffect, useState } from 'react'; 

import { useHistory } from 'react-router-dom';

import Layout from '../../Layouts/default';

import categoryService from '../../../services/api/category'

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'

import { Container, Footer, Title, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormCategory() {
  const history = useHistory();

  const { createCategory, updateCategory } = categoryService();

  const [category, setCategory] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    if (history.location.pathname === '/categorias/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');

      const state = history.location.state;

      if (!state) history.goBack()

      setCategory(state);
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
    <Layout 
      background= "#F1F1F1"
      title={operation === 'ADD' ? 'Nova categoria' : `Editando: ${category && category.nome}`}
    >
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
              { operation === 'ADD' ? 'SALVAR' : 'ATUALIZAR' }
            </Button>
          </ButtonGroup>
        </Form>

        <Footer>
          <Button
            type="button"
            background="#FFCC01"
            color="#FFF"
            fontWeight="bold"
            border="1px solid #FFCC01"
            onClick={handleCancel}
          >
            VOLTAR
          </Button>
        </Footer>
      </Container>
    </Layout>
  );
}
 