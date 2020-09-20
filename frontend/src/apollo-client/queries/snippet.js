import gql from 'graphql-tag';

export const MY_SNIPPETS = gql`
  {
    mySnippets {
      id
      title
      body
    }
  }
`;

export const CREATE_SNIPPET = gql`
  mutation createSnippet($snippet: SnippetInput!) {
    createSnippet(snippet: $snippet) {
      id
      title
      body
    }
  }
`;
