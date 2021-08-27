import { useEffect, useState, useCallback } from 'react'; 
import { Form, Input, Select } from '@rocketseat/unform';
import api from '../../../services/api';
import Toast from '../../../utils/toastify';

import { useHistory } from 'react-router-dom';

import { produtctSizes } from '../../../services/dataLocal'

import Layout from '../../_layouts/form';

import useProduct from '../../../hooks/useProduct';

import { Body, Container, Grouping, IGroup, BGroup } from './styles';

export default function FormProduct() {
  const history = useHistory();

  const { createProduct, updateProduct } = useProduct();

  const [product, setProduct] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const [currentProvider, setCurrentProvider] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    async function searchAllCategories() {
      try {
        const { data } = await api.post('/categories/search/1/0');
  
        let newData = [];
    
        data.data.forEach((item) => {
          const element = { id: item.id_categoria, title: item.nome };
  
          newData.push(element)
        });
  
        setCategories(newData);
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

    async function searchAllProviders() {
      try {
        const { data } = await api.post('/providers/search/1/0');
  
        let newData = [];
    
        data.data.forEach((item) => {
          const element = { id: item.id_fornecedor, title: item.nome };
  
          newData.push(element)
        });
  
        setProviders(newData);
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

    searchAllCategories();
    searchAllProviders();

    setProduct(history.location.state);

    if (history.location.pathname === '/produtos/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');
      setCurrentCategory(history.location.state.id_produto);
      setCurrentProvider(history.location.state.id_fornecedor);
      setCurrentSize(history.location.state.tamanho);
    }
  }, [history])

  async function handleSubmit(data) {
    if (operation === 'ADD') {
      delete data.id_produto
      
      await createProduct(data)
    } else {
      await updateProduct(data);
    }
  }

  function handleCancel() {
    history.goBack()
  }

  const handleSelectCategory = useCallback((e) => {
    setCurrentCategory(e.target.value);
    setButtonAvailable(false);
  }, []);

  const handleSelectProvider = useCallback((e) => {
    setCurrentProvider(e.target.value);
    setButtonAvailable(false);
  }, []);

  const handleSelectSize = useCallback((e) => {
    setCurrentSize(e.target.value);
    setButtonAvailable(false);
  }, []);

  return (
    <Layout>  
      <Body>
        <Container>
          <Container.Title>
            <h1> { operation === 'ADD' ? 'Novo produto!' : 'Editar produto!' }</h1>
            <p>Crie e personalize seus produtos!</p>
          </Container.Title>

          <Form initialData={product} onSubmit={handleSubmit} autoComplete="off">
            <Input 
              type="text" 
              name="id_produto"
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

            <Grouping>
              <IGroup>
                <IGroup.Label>Escolha a categoria</IGroup.Label>

                <Select 
                  name="id_categoria" 
                  value={currentCategory}
                  onChange={handleSelectCategory}
                  options={categories} 
                  required
                />
              </IGroup>

              <IGroup>
                <IGroup.Label>Fornecedor do produto</IGroup.Label>

                <Select 
                  name="id_fornecedor" 
                  value={currentProvider}
                  onChange={handleSelectProvider}
                  options={providers} 
                />
              </IGroup>
            </Grouping>

            <Grouping>
              <IGroup>
                <IGroup.Label>Preço de custo</IGroup.Label>

                <Input 
                  type="text" 
                  name="preco_custo"
                  maxLength={50}
                  onChange={() => { setButtonAvailable(false) }}
                  required
                />
              </IGroup>

              <IGroup>
                <IGroup.Label>Preço de venda</IGroup.Label>

                <Input 
                  type="text" 
                  name="preco_venda"
                  maxLength={50}
                  onChange={() => { setButtonAvailable(false) }}
                  required
                />
              </IGroup>

              <IGroup>
                <IGroup.Label>Preço de promocional</IGroup.Label>

                <Input 
                  type="text" 
                  name="preco_promocional"
                  maxLength={50}
                  onChange={() => { setButtonAvailable(false) }}
                />
              </IGroup>
            </Grouping>

            <Grouping>
              <IGroup>
                <IGroup.Label>Tamanho</IGroup.Label>

                <Select 
                  name="tamanho" 
                  value={currentSize}
                  onChange={handleSelectSize}
                  options={produtctSizes} 
                  required
                />
              </IGroup>

              <IGroup>
                <IGroup.Label>Qtd em estoque</IGroup.Label>

                <Input 
                  type="text" 
                  name="estoque"
                  maxLength={50}
                  onChange={() => { setButtonAvailable(false) }}
                  required
                />
              </IGroup>
            </Grouping>

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
 