import { Button } from './styles';

export default function ComponentButton({ 
  children,
  background,
  color,
  border = '0',
  fontSize = '12px',
  fontWeight = 'normal',
  ...props 
}) {  
  return (
    <Button
      {...props}
      background={background}
      color={color}
      border={border}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </Button>
  );
}
