import { useEffect, useState, useCallback } from 'react'; 
import { Form, Input, Select } from '@rocketseat/unform';
import api from '../../../services/api';
import Toast from '../../../utils/toastify';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';

import useProfile from '../../../hooks/useProfile';
import usePermissions from '../../../hooks/usePermissions';

import { IoIosRemove } from 'react-icons/io';

import { Body, Container, IGroup, BGroup, Permissions } from './styles';

export default function FormPerfis() {
  const history = useHistory();

  const { createProfile, updateProfile } = useProfile();
  const { createPermissions, deletePermissions } = usePermissions();

  const [profile, setProfile] = useState();
  const [operation, setOperation] = useState();

  const [currentPermissions, setCurrentPermissions] = useState();
  const [allPermissions, setAllPermissions] = useState([]);
  const [permission, setPermission] = useState(null);
  const [type, setType] = useState('');
  const [context, setContext] = useState('');
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function searchPermissions() {
      try {
        const { data, status } = await api.get(`/permissoes/search/${history.location.state.id_perfil}`);

        if (status === 206) {
          Toast('warn', data.error.details[0].message);
  
          return false;
        }

        setCurrentPermissions(data);
      } catch (err) {
        Toast('error', err.toString());
  
        return false;
      }
    }

    async function searchPermission() {
      try {
        const { data, status } = await api.post('/permissao/search', {
          tipo: type,
          contexto: context,
          id_perfil: history.location.state.id_perfil
        });

        if (status === 206) {
          Toast('warn', data.error.details[0].message);
  
          return false;
        }

        let newData = [];
    
        data.forEach((item) => {
          const element = { id: item.id_permissao, title: item.descricao };
  
          newData.push(element)
        });
  
        setAllPermissions(newData);
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
  }, [history, type, context, refresh])
  
  async function handleSubmit(data) {
    delete data.permission;

    if (operation === 'ADD')
      await createProfile(data)

    if (operation === 'EDIT')
      await updateProfile(data);
  }

  function handleCancel() {
    history.goBack()
  }

  const handlePermission = useCallback((e) => {
    setPermission(e.target.value);
  }, [])

  const handleType = useCallback((e) => {
    setType(e.target.value);
  }, [])

  const handleContext = useCallback((e) => {
    setContext(e.target.value);
  }, [])

  async function handleAddPermission() {
    await createPermissions({
      id_perfil: profile.id_perfil,
      id_permissao: permission
    })

    setPermission('');
    setRefresh(!refresh);
  }

  async function handleDeletePermission(item) {
    if(window.confirm(`Deseja excluir a permissão de "${item.descricao}" do perfil ${profile.nome}?`)) {
      
      await deletePermissions({ data: { id_permissao_perfil: item.id_permissao_perfil } });

      setRefresh(!refresh);

    } else {
      return;
    }
  }

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
              <Permissions.Current>
                <Permissions.Label>Permissões</Permissions.Label>

                <Permissions.Ph>
                  <Permissions.Pd className="pd-id"> ID </Permissions.Pd>
                  <Permissions.Pd className="pd-description"> Descrição </Permissions.Pd>
                  <Permissions.Pd className="pd-type"> Tipo </Permissions.Pd>
                  <Permissions.Pd className="pd-context"> Contexto </Permissions.Pd>
                  <Permissions.Pd className="pd-delete" />
                </Permissions.Ph>

                { currentPermissions && currentPermissions.map((item, index) => (
                  <Permissions.Pr key={item.id_permissao_perfil}>
                    <Permissions.Pd className="pd-id"> {index+1} </Permissions.Pd>
                    <Permissions.Pd className="pd-description"> {item.descricao} </Permissions.Pd>
                    <Permissions.Pd className="pd-type"> {item.tipo} </Permissions.Pd>
                    <Permissions.Pd className="pd-context"> {item.contexto} </Permissions.Pd>
                    <Permissions.Pd className="pd-delete"> <IoIosRemove size={16} color="#555" onClick={() => { handleDeletePermission(item) }}/> </Permissions.Pd>
                  </Permissions.Pr>
                )) }
              </Permissions.Current>

              <Permissions.All>
                <Permissions.Label>Adicionar uma permissão</Permissions.Label>

                <Permissions.Ph>
                  <Permissions.Pd className="pd-description"> Permissão </Permissions.Pd>
                  <Permissions.Pd className="pd-type"> Tipo </Permissions.Pd>
                  <Permissions.Pd className="pd-context"> Contexto </Permissions.Pd>
                </Permissions.Ph>

                <Permissions.Filters>
                  <Select 
                    className="pd-description"
                    name="permission" 
                    value={permission}
                    onChange={handlePermission}
                    options={allPermissions}
                  />

                  <select 
                    onChange={handleType} 
                    className="pd-type"
                  >
                    <option value="">Todos</option>
                    <option value="T">Tela</option>
                    <option value="F">Função</option>
                  </select>

                  <select 
                    onChange={handleContext} 
                    className="pd-context"
                  >
                    <option value="">Todos</option>
                    <option value="Perfis">Perfis</option>
                    <option value="Configurações">Configurações</option>
                  </select>
                </Permissions.Filters>
              </Permissions.All>

              <Permissions.Button
                type="button"
                onClick={handleAddPermission}
                disabled={!permission}
              > 
                Adicionar 
              </Permissions.Button>
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
 