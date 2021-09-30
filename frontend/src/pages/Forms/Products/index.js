import { useEffect, useState, useCallback } from 'react'; 
import api from '../../../services/api/api';
import Toast from '../../../utils/toastify';
import { replaceForCurrency, replaceForNumber } from '../../../utils/replaceValue';

import { useHistory } from 'react-router-dom';

import { comboboxSizeProduct } from '../../../constants/array'

import Layout from '../../Layouts/default';

import productService from '../../../services/api/product';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Select from '../../../components/Select';

import { Container, Footer, Title, Grouping, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormProduct() {
  const history = useHistory();

  const { createProduct, updateProduct } = productService();

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
        const { data } = await api.post('/categories/search/1/1000', { key: '' });
  
        let newData = [];
    
        data.data.forEach((item) => {
          const element = { id: item.id_categoria, title: item.nome };
  
          newData.push(element)
        });
  
        setCategories(newData);
      } catch (err) {
        if (!err.response) {
          Toast('error', 'Network Error');
        } else {
          const { data, status } = err.response

          if (status === 403 || status === 422) {
            Toast(data.result, data.message);
    
            return;
          }
          
          Toast('error', err.toString());
    
          return;
        }
      }
    }

    async function searchAllProviders() {
      try {
        const { data } = await api.post('/providers/search/1/1000', { key: '' });
  
        let newData = [{ id: 'Nenhum', title: 'Nenhum'}];
    
        data.data.forEach((item) => {
          const element = { id: item.id_fornecedor, title: item.nome };
  
          newData.push(element)
        });
  
        setProviders(newData);
      } catch (err) {
        if (!err.response) {
          Toast('error', 'Network Error');
        } else {
          const { data, status } = err.response

          if (status === 403 || status === 422) {
            Toast(data.result, data.message);
    
            return;
          }
          
          Toast('error', err.toString());
    
          return;
        }
      }
    }

    if (history.location.pathname === '/produtos/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');

      const state = history.location.state;

      if (!state) history.goBack()

      setProduct(state);
      setCurrentCategory(state.id_categoria);
      setCurrentSize(state.tamanho);
      setCurrentProvider(
        state.id_fornecedor === null ? 
        'Nenhum' : 
        state.id_fornecedor
      );
    }

    searchAllCategories();
    searchAllProviders();
  }, [history])

  async function handleSubmit(data) {
    if (replaceForNumber(data.preco_venda) <= replaceForNumber(data.preco_custo)) {
      console.log('O preço de custo precisa ser o mais baixo')

      return
    }

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
    <Layout
      background="#F1F1F1"
      title={operation === 'ADD' ? 'Novo produto' : `Editando: ${product && product.nome}`}
    >
      <Container>
        <Form initialData={product} onSubmit={handleSubmit} autoComplete="off">
          <Title>
            <h1> { operation === 'ADD' ? 'Novo produto' : 'Editar produto' }</h1>
          </Title>
          
          <Input 
            type="text" 
            name="id_produto"
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

          <Grouping>
            <InputGroup>
              <Label>Escolha a categoria</Label>

              <Select 
                name="id_categoria" 
                value={currentCategory}
                onChange={handleSelectCategory}
                options={categories} 
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Fornecedor do produto</Label>

              <Select 
                name="id_fornecedor" 
                value={currentProvider}
                onChange={handleSelectProvider}
                options={providers} 
                required
              />
            </InputGroup>
          </Grouping>

          <Grouping>
            <InputGroup>
              <Label>Preço de custo</Label>

              <Input 
                type="text" 
                name="preco_custo"
                prefix="R$"
                maxLength={12}
                onChange={(e) => { 
                  replaceForCurrency(e) 
                  setButtonAvailable(false)
                }}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Preço de venda</Label>

              <Input 
                type="text" 
                name="preco_venda"
                prefix="R$"
                maxLength={12}
                onChange={(e) => { 
                  replaceForCurrency(e) 
                  setButtonAvailable(false)
                }}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Tamanho</Label>

              <Select 
                name="tamanho" 
                value={currentSize}
                onChange={handleSelectSize}
                options={comboboxSizeProduct} 
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Qtd em estoque</Label>

              <Input 
                type="number" 
                name="estoque"
                maxLength={50}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </InputGroup>
          </Grouping>

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
 