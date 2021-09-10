import { Button } from './styles';

export default function ComponentButton({ children, background, color, border, ...props }) {  
  return (
    <Button
      {...props}
      background={background}
      color={color}
      border={border}
    >
      {children}
    </Button>
  );
}
