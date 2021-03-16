import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: 0;
  }

  *:focus {
    outline: 0;
  }

  html, box-sizing, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
