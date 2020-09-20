import gql from 'graphql-tag';

export const ACTIVE_VIEW = gql`
  query activeView {
    activeView {
      id
      name
      fieldGroups {
        id
        name
        order
        fields {
          id
          name
          order
          type
          required
        }
      }
    }
  }
`;

export const EDIT_VIEW = gql`
  mutation editView($groups: [GroupInput!]) {
    editView(groups: $groups)
  }
`;

export const CREATE_VIEW = gql`
  mutation createView($view: ViewInput!) {
    createView(view: $view)
  }
`;

export const LIST_MY_VIEWS_SUMMARY = gql`
  {
    listMyViews {
      id
      name
    }
  }
`;
export const LIST_MY_VIEWS_STATUS = gql`
  {
    listMyViewsStatus {
      id
      activeViewId
      defaultViewId
    }
  }
`;

export const CREATE_DEFAULT_VIEW = gql`
  mutation createDefaultView {
    createDefaultView
  }
`;

export const ACTIVATE_VIEW = gql`
  mutation activateView($viewId: ID!) {
    activateView(viewId: $viewId) {
      id
      activeViewId
    }
  }
`;
