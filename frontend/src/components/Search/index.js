import { Container, Input } from './styles'

import Select from '../Select'

import { comboboxRows } from '../../constants/array'

export default function ComponentSearch({ search, setSearch, viewPermission, limit, handleLimit }) {  
  return (
    <Container>
      <Input 
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
    </Container>
  );
}
