import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 100%;
    height: 1rem;
    color: #222;
    background-color: #F6F6F6;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border: 0;
    border-bottom: 1px solid #C6C6C6;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

    &:hover {
      transition: 0.25s;
      background: ${darken(0.01, '#F6F6F6')};
    }

    &:focus {
      color: #666;
      border-bottom: 1px solid #0052CC;
    }
  }

  span {
    display: flex;
    align-items: center;
    background: #eee;
    color: #444;
    font-size: 0.875rem;
    height: 1rem;
    padding: 0.25rem 0.4rem;
    border: 0;
    border-bottom: 1px solid #C6C6C6;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }
`;
