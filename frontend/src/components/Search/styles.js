import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

export const Input = styled.input`
  width: 10rem;
  height: 1.25rem;
  background-image: url("https://img.icons8.com/search");
  background-size: 1rem;
  background-position: right;
  background-repeat: no-repeat;
  background-origin: content-box;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border: 0;
  border: 1px solid #eee;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  transition: 0.35s;

  &:hover {
    background-color: ${darken(0.01, '#F4F5F7')};
  }

  &:focus {
    width: 25rem;
    background-color: #FFF;
    border: 1px solid #0052CC;
  }
`;
