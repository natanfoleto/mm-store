import { useEffect, useState, useCallback } from 'react'; 
import api from '../../../services/api';
import { typesProfile, contextsProfile } from '../../../services/dataLocal'
import Toast from '../../../utils/toastify';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';
import Alert from '../../../components/Alert';

import useProfile from '../../../hooks/useProfile';
import usePermissions from '../../../hooks/usePermissions';

import { IoIosRemove } from 'react-icons/io';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Select from '../../../components/Select';

import { Permissions } from './styles';
import { Container, IGroup, BGroup } from '../styles';

export default function FormProfile() {
  const history = useHistory();

  const { createProfile, updateProfile } = useProfile();
  const { createPermissions, deletePermissions } = usePermissions();

  const [profile, setProfile] = useState();
  const [operation, setOperation] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);

  const [currentPermissions, setCurrentPermissions] = useState();
  const [allPermissions, setAllPermissions] = useState([]);
  const [permission, setPermission] = useState();
  const [type, setType] = useState('');
  const [context, setContext] = useState('');
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function searchPermissionsProfiles() {
      try {
        const { data } = await api.get(`/permissions/search/${history.location.state.id_perfil}`);

        setCurrentPermissions(data);
      } catch (err) {
        const { data, status } = err.response

        if (status === 403 || status === 422) {
          Toast(data.result, data.message);
  
          return;
        }
        
        Toast('error', err.toString());
  
        return;
      }
    }

    async function searchPermissions() {
      try {
        const { data } = await api.post('/permission/search/forprofile', {
          tipo: type,
          contexto: context,
          id_perfil: history.location.state.id_perfil
        });

        let newData = [];
    
        data.forEach((item) => {
          const element = { id: item.id_permissao, title: item.descricao };
  
          newData.push(element)
        });
  
        setAllPermissions(newData);
      } catch (err) {
        const { data, status } = err.response

        if (status === 403 || status === 422) {
          Toast(data.result, data.message);
  
          return;
        }
        
        Toast('error', err.toString());
  
        return;
      }
    }

    if (history.location.pathname === '/perfis/edit') {
      searchPermissions();
      searchPermissionsProfiles();
    }

    setProfile(history.location.state);

    if (history.location.pathname === '/perfis/add')
      setOperation('ADD');
    else
      setOperation('EDIT');
  }, [history, type, context, refresh])
  
  async function handleSubmit(data) {
    delete data.permission;
    delete data.types;
    delete data.contexts;

    if (operation === 'ADD') {
      delete data.id_perfil;

      await createProfile(data)
    }

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
    setButtonAvailable(false);
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
              onChange={() => { setButtonAvailable(false) }}
              maxLength={50}
              required
            />
          </IGroup>

          { operation === 'ADD' &&
            <Alert 
              color="#856404"
              background="#FFF3CD"
              borderColor="#FFEEBA"
            > 
              Ao salvar, você pode editar o perfil pra definir suas configurações de permissão. 
            </Alert>
          }

          { operation === 'EDIT' &&
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

                  <Select 
                    name="types" 
                    options={typesProfile}
                    onChange={handleType} 
                    className="pd-type"
                  />

                  <Select 
                    name="contexts" 
                    options={contextsProfile}
                    onChange={handleContext} 
                    className="pd-context"
                  />
                </Permissions.Filters>
              </Permissions.All>

              <Permissions.Button
                type="button"
                onClick={handleAddPermission}
                disabled={!permission}
              > 
                Adicionar 
              </Permissions.Button>

              <Alert 
                color="#856404"
                background="#FFF3CD"
                borderColor="#FFEEBA"
              > 
                As alterações nas permissões, passam valer quando é adicionada ou removida. 
              </Alert>
            </Permissions>
          }

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
 