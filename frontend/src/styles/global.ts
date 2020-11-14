import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
body{
  background: #FFFFFF ;
  -webkit-font-smoothing: antialiased;
}
body, input, button, textarea {
  font: 1.6rem Signika, sans-serif;
}
#root{
  max-width: 960px;
}
button{
  cursor: pointer;
}
`;
