import { useEffect, useState, useCallback } from 'react'; 
import { Form, Input, Select } from '@rocketseat/unform';
import api from '../../../services/api';
import Toast from '../../../utils/toastify';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';

import useProfile from '../../../hooks/useProfile';

import { IoIosRemove } from 'react-icons/io';

import { Body, Container, IGroup, BGroup, Permissions } from './styles';

export default function FormPerfis() {
  const history = useHistory();

  const { createProfile, updateProfile } = useProfile();

  const [profile, setProfile] = useState();
  const [operation, setOperation] = useState();
  const [permissions, setPermissions] = useState();
  const [permission, setPermission] = useState([]);
  const [type, setType] = useState('');
  const [context, setContext] = useState('');

  useEffect(() => {
    async function searchPermissions() {
      try {
        const { data } = await api.get(`/permissoes/search/${history.location.state.id_perfil}`);

        setPermissions(data);
      } catch (err) {
        Toast('error', err.toString());
  
        return false;
      }
    }

    async function searchPermission() {
      try {
        const { data } = await api.post('/permissao/search', {
          tipo: type,
          contexto: context
        });

        let newData = [];
    
        data.forEach((item) => {
          const element = { id: item.id_permissao, title: item.descricao };
  
          newData.push(element)
        });
  
        setPermission(newData);
      } catch (err) {
        Toast('error', err.toString());
  
        return false;
      }
    }

    searchPermission();
    searchPermissions();

    setProfile(history.location.state);

    if (history.location.pathname === '/perfis/add')
      setOperation('ADD');
    else
      setOperation('EDIT');
  }, [history, type, context])
  
  async function handleSubmit(data) {
    if (operation === 'ADD')
      await createProfile(data)

    if (operation === 'EDIT')
      await updateProfile(data);
  }

  function handleCancel() {
    history.goBack()
  }

  async function handleDeletePermission(item) {
    if(window.confirm(`Deseja excluir a permissão de "${item.descricao}" do perfil ${profile.nome}?`)) {
      
      alert('Excluido')
    } else {
      return;
    }
  }

  const handleType = useCallback((e) => {
    setType(e.target.value);
  }, [])

  const handleContext = useCallback((e) => {
    setContext(e.target.value);
  }, [])

  return (
    <Layout>  
      <Body>
        <Container>
          <Container.Title>
            <h1> { operation === 'ADD' ? 'Novo perfil!' : 'Editar perfil!' }</h1>
            <p>Utilize os perfis, para delegar permissões aos usuários!</p>
          </Container.Title>

          <Form initialData={profile} onSubmit={handleSubmit} autoComplete="off">
            <Input 
              type="text" 
              name="id_perfil"
              hidden={true}
            />

            <IGroup>
              <IGroup.Label>Nome</IGroup.Label>

              <Input 
                type="text" 
                name="nome"
                required
              />
            </IGroup>

            <Permissions>
              <label>Permissões</label>

              <Permissions.Item className="item-title">
                <p className="item-id"> ID </p>
                <p className="item-description"> Descrição </p>
                <p className="item-type"> Tipo </p>
                <p className="item-context"> Contexto </p>
                <p className="item-delete"> <IoIosRemove size={20} color="#555"/> </p>
              </Permissions.Item>

              { permissions && permissions.map((item, index) => (
                <Permissions.Item key={item.id_permissao_perfil}>
                  <p className="item-id"> {index+1} </p>
                  <p className="item-description"> {item.descricao} </p>
                  <p className="item-type"> {item.tipo} </p>
                  <p className="item-context"> {item.contexto} </p>
                  <p className="item-delete"> <IoIosRemove size={20} color="#555" onClick={() => { handleDeletePermission(item) }}/> </p>
                </Permissions.Item>
              )) }

              <label>Adicionar uma permissão</label>

              <Permissions.Item className="item-title-permission">
                <p className="item-description-permission"> Permissão </p>
                <p className="item-type-permission"> Tipo </p>
                <p className="item-context-permission"> Contexto </p>
              </Permissions.Item>

              <Permissions.AddItem>
                <Select 
                  className="item-description-permission"
                  name="permission" 
                  value={permission[0]}
                  // onChange={handleSelect}
                  options={permission}
                />

                <select 
                  onChange={handleType} 
                  className="item-type-permission"
                >
                  <option value="">Todos</option>
                  <option value="T">Tela</option>
                  <option value="F">Função</option>
                </select>

                <select 
                  onChange={handleContext} 
                  className="item-context-permission"
                >
                  <option value="">Todos</option>
                  <option value="Perfis">Perfis</option>
                  <option value="Configurações">Configurações</option>
                </select>
              </Permissions.AddItem>

              <Permissions.Button type="button"> Adicionar </Permissions.Button>
            </Permissions>

            <BGroup>
              <BGroup.Button 
                type="submit" 
                color="#003464"
              >
                { operation === 'ADD' ? 'Criar' : 'Atualizar'}
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
 