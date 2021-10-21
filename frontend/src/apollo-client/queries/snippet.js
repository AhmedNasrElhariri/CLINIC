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

export const UPDATE_SNIPPET = gql`
  mutation updateSnippet($snippet: SnippetInput!) {
    updateSnippet(snippet: $snippet) {
      id
      title
      body
    }
  }
`;
export const DELETE_SNIPPET = gql`
  mutation deleteSnippet($id: ID!) {
    deleteSnippet(id: $id) {
      id
      title
      body
    }
  }
`;
