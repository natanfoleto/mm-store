import { Container, Input, Filter } from './styles'

import Select from '../Select'
import Button from '../Button'

import { comboboxRows } from '../../constants/array'

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
          options={comboboxRows}
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
