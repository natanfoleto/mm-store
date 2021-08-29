import { Button } from './styles';

export default function ComponentButton({ children, background, color, ...props }) {  
  return (
    <Button
      {...props}
      background={background}
      color={color}
    >
      {children}
    </Button>
  );
}
