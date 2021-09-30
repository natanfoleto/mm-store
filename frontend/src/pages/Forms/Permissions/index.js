import { useEffect, useState, useCallback } from 'react'; 

import { useHistory } from 'react-router-dom';

import { comboboxTypePermission, comboboxContextPermission } from '../../../constants/array'

import Layout from '../../Layouts/default';

import permissionService from '../../../services/api/permission';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Select from '../../../components/Select';

import { Container, Footer, Title, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormPermission() {
  const history = useHistory();

  const { createPermission, updatePermission } = permissionService();

  const [permission, setPermission] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  const [currentType, setCurrentType] = useState();
  const [currentContext, setCurrentContext] = useState()
  
  useEffect(() => {
    if (history.location.pathname === '/permissoes/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');

      const state = history.location.state;

      if (!state) history.goBack()

      setPermission(state);

      setCurrentType(state.tipo);
      setCurrentContext(state.contexto);
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
    history.goBack();
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
    <Layout 
      background= "#F1F1F1"
      title={operation === 'ADD' ? 'Nova permissão' : `Editando: ${permission && permission.nome}`}
    >
      <Container>
        <Form initialData={permission} onSubmit={handleSubmit} autoComplete="off">
          <Title>
            <h1> { operation === 'ADD' ? 'Nova permissão' : 'Editar permissão' }</h1>
          </Title>
          
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
              options={comboboxTypePermission} 
              onChange={handleSelectType}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Escolha o contexto</Label>

            <Select 
              name="contexto" 
              value={currentContext}
              options={comboboxContextPermission} 
              onChange={handleSelectContext}
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
 