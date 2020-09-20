import gql from 'graphql-tag';

export const LIST_EVENTS = gql`
  query myEvents {
    myEvents {
      id
      name
      start
      end
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($event: EventInput!) {
    createEvent(event: $event) {
      id
      name
      start
      end
    }
  }
`;
