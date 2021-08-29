import { useEffect, useState } from 'react'; 

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';

import useCategory from '../../../hooks/useCategory';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'

import { Container, IGroup, BGroup } from '../styles';

export default function FormCategory() {
  const history = useHistory();

  const { createCategory, updateCategory } = useCategory();

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
    <Layout>  
      <Container>
        <Container.Title>
          <h1> { operation === 'ADD' ? 'Nova categoria!' : 'Editar categoria!' }</h1>
          <p>Use as categorias, para classificar seus produtos!</p>
        </Container.Title>

        <Form initialData={category} onSubmit={handleSubmit} autoComplete="off">
          <Input 
            type="text" 
            name="id_categoria"
            hidden={true}
          />
          
          <IGroup>
            <IGroup.Label>Nome</IGroup.Label>

            <Input 
              type="text" 
              name="nome"
              maxLength={100}
              onChange={() => { setButtonAvailable(false) }}
              required
            />
          </IGroup>

          <BGroup>
            <Button
              type="submit"
              background="#003464"
              color="#FFF"
              disabled={buttonAvailable}
            >
              Salvar
            </Button>

            <Button
              type="button"
              background="#e84545"
              color="#FFF"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </BGroup>
        </Form>
      </Container>
    </Layout>
  );
}
 