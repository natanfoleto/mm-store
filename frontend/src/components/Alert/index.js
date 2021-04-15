import { useState } from 'react';

import { RiCloseFill } from 'react-icons/ri';

import { Content } from './styles';

export default function ComponentAlert({ children, color = '#444', background = '#eee', borderColor = '#ddd', marginTop = 15 }) {
  const [display, setDisplay] = useState('flex');

  return (
    <Content 
      display={display}
      color={color}
      background={background}
      borderColor={borderColor}
      marginTop={`${marginTop}px`}
    >
      <p>{children}</p>
      <RiCloseFill style={{ cursor: 'pointer' }} onClick={() => { setDisplay('none') }} />
    </Content>
  );
}
