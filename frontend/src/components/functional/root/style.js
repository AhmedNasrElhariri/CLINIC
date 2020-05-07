import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding:0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    .no-list-style {
      list-style-type:none;
    }

    .cursor-pointer{
      cursor: pointer;
    }


`;

export const ContainerStyled = styled.div`
  display: flex;
`;

export const ContentContainerStyled = styled.div`
  padding: 1rem 3rem;
  width: 100%;
`;

export const LoginContainerStyled = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5rem;
`;
