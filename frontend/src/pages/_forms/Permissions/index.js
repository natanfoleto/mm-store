import { useEffect, useState, useCallback } from 'react'; 

import { useHistory } from 'react-router-dom';

import { typesPermission, contextsPermisssion } from '../../../services/dataLocal'

import Layout from '../../_layouts/form';

import usePermission from '../../../hooks/usePermission';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Select from '../../../components/Select';

import { Container, Title, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormPermission() {
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
      delete data.id_permissao;

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
    <Layout title={operation === 'ADD' ? 'Nova permissão' : `Editando: ${permission && permission.nome}`}>  
      <Container>
        <Title>
          <h1> { operation === 'ADD' ? 'Nova permissão!' : 'Editar permissão!' }</h1>
          <p>Use permissões, para controlar tarefas dentro do sistema!</p>
        </Title>

        <Form initialData={permission} onSubmit={handleSubmit} autoComplete="off">
          <Input 
            type="text" 
            name="id_permissao"
            hidden={true}
          />
          
          <InputGroup>
            <Label>Nome</Label>

            <Input 
              type="text" 
              name="nome"
              maxLength={50}
              onChange={() => { setButtonAvailable(false) }}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Descrição</Label>

            <Input 
              type="text" 
              name="descricao"
              maxLength={100}
              onChange={() => { setButtonAvailable(false) }}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Escolha o tipo</Label>

            <Select 
              name="tipo" 
              value={currentType}
              options={typesPermission} 
              onChange={handleSelectType}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Escolha o contexto</Label>

            <Select 
              name="contexto" 
              value={currentContext}
              options={contextsPermisssion} 
              onChange={handleSelectContext}
              required
            />
          </InputGroup>

          <ButtonGroup>
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
          </ButtonGroup>
        </Form>
      </Container>
    </Layout>
  );
}
 