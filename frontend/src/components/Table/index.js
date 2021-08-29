import { BiLoader } from 'react-icons/bi';

import { Container, Content, LoadData } from './styles'

export default function ComponentTable({ data, Card }) {  
  return (
    <Container>
      { 
        data ? 
          data.map((item, index) => (
            <Content 
              key={index} 
            >
              <Card item={item} />
            </Content>
          ))
        :
          <LoadData> 
            <BiLoader size={22} />
          </LoadData>
      }
    </Container>
  );
}
