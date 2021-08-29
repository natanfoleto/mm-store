import { Container, Input, Filter } from './styles'

import Select from '../Select'
import Button from '../Button'

import { rows } from '../../services/dataLocal'

export default function ComponentSearch({ placeholder, search, setSearch, viewPermission, limit, handleLimit, handleCreate }) {  
  return (
    <Container>
      <Filter>
        <Input 
          placeholder={placeholder} 
          value={search}
          maxLength={50}
          onChange={e => setSearch(e.target.value)}
          disabled={viewPermission}
        />

        <Select 
          name="rows"
          options={rows}
          onChange={handleLimit}
          disabled={viewPermission}
          placeholder={`${limit} rows`}
        />

      </Filter>

      <Button 
        onClick={handleCreate}
        background="#003464"
        color="#FFF"
      >
        Criar
      </Button>
    </Container>
  );
}
