import { useHistory } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { Button } from './styles';

export default function ComponentButtonBack({ size, color }) {
  const history = useHistory();

  function handleBack() {
    history.goBack()
  }
  
  return (
    <Button onClick={handleBack}>
      <IoMdArrowRoundBack size={size} color={color} />
    </Button>
  );
}
