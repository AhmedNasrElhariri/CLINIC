import gql from 'graphql-tag';

export const ACTIVE_VIEWS = gql`
  query activeViews {
    activeViews {
      id
      name
      type
      fieldGroups {
        id
        name
        order
        fields {
          id
          name
          order
          type
          choices
        }
      }
    }
  }
`;

export const ALL_AREAS = gql`
  query areas {
    areas {
      id
      governorate_id
      city_name_ar
      city_name_en
    }
  }
`;

export const EDIT_VIEW = gql`
  mutation editView($groups: [GroupInput!]) {
    editView(groups: $groups)
  }
`;

export const UPDATE_VIEW = gql`
  mutation updateView($view: ViewInput!, $viewId: ID!) {
    updateView(view: $view, viewId: $viewId)
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
      type
      fieldGroups {
        name
        id
        fields {
          name
          type
          id
        }
      }
    }
  }
`;

export const MY_VIEW = gql`
  query MyView($id: ID!) {
    MyView(id: $id) {
      id
      name
      type
      fieldGroups {
        name
        id
        fields {
          name
          type
          id
        }
      }
    }
  }
`;
export const LIST_MY_VIEWS_STATUS = gql`
  {
    listMyViewsStatus {
      id
      activeViewId
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
