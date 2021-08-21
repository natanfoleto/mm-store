import { useEffect, useState, useCallback } from 'react'; 
import { Form, Input, Select } from '@rocketseat/unform';

import { useHistory } from 'react-router-dom';

import { typesPermission, contextsPermisssion } from '../../../services/dataLocal'

import Layout from '../../_layouts/form';

import usePermission from '../../../hooks/usePermission';

import { Body, Container, IGroup, BGroup } from './styles';

export default function FormPermissions() {
  const history = useHistory();

  const { createPermission, updatePermission } = usePermission();

  const [permission, setPermission] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  const [currentType, setCurrentType] = useState();
  const [currentContext, setCurrentContext] = useState()
  
  useEffect(() => {
    setPermission(history.location.state);

    if (history.location.pathname === '/permissoes/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');
      setCurrentType(history.location.state.tipo)
      setCurrentContext(history.location.state.contexto)
    }
  }, [history])

  async function handleSubmit(data) {
    if (operation === 'ADD') {
      await createPermission(data)
    } else {
      delete data.password;

      await updatePermission(data);
    }
  }

  function handleCancel() {
    history.goBack()
  }

  const handleSelectType = useCallback((e) => {
    setCurrentType(e.target.value);
    setButtonAvailable(false);
  }, [])

  const handleSelectContext = useCallback((e) => {
    setCurrentContext(e.target.value);
    setButtonAvailable(false);
  }, [])

  return (
    <Layout>  
      <Body>
        <Container>
          <Container.Title>
            <h1> { operation === 'ADD' ? 'Nova permissão!' : 'Editar permissão!' }</h1>
            <p>Use permissões, para controlar tarefas dentro do sistema!</p>
          </Container.Title>

          <Form initialData={permission} onSubmit={handleSubmit} autoComplete="off">
            <Input 
              type="text" 
              name="id_permissao"
              hidden={true}
            />
            
            <IGroup>
              <IGroup.Label>Nome</IGroup.Label>

              <Input 
                type="text" 
                name="nome"
                maxLength={50}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </IGroup>

            <IGroup>
              <IGroup.Label>Descrição</IGroup.Label>

              <Input 
                type="text" 
                name="descricao"
                maxLength={100}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </IGroup>

            <IGroup>
              <IGroup.Label>Escolha o tipo</IGroup.Label>

              <Select 
                name="tipo" 
                value={currentType}
                options={typesPermission} 
                onChange={handleSelectType}
                required
              />
            </IGroup>

            <IGroup>
              <IGroup.Label>Escolha o contexto</IGroup.Label>

              <Select 
                name="contexto" 
                value={currentContext}
                options={contextsPermisssion} 
                onChange={handleSelectContext}
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
 