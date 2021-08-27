import { useEffect, useState } from 'react'; 
import { Form, Input } from '@rocketseat/unform';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';

import useCategory from '../../../hooks/useCategory';

import { Body, Container, IGroup, BGroup } from './styles';

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
      <Body>
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
              <BGroup.Button 
                type="submit" 
                color="#003464"
                disabled={buttonAvailable}
              >
                Salvar
              </BGroup.Button>

              <BGroup.Button 
                type="button"
                color="#e84545"
                onClick={handleCancel}
              >
                Cancelar
              </BGroup.Button>
            </BGroup>
          </Form>
        </Container>
      </Body>
    </Layout>
  );
}
 