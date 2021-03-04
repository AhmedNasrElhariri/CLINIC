import gql from 'graphql-tag';

export const LIST_TIMINGS = gql`
  {
    myTimings {
      id
      name
      printValue
    }
  }
`;

export const ADD_TIMING = gql`
  mutation addTiming($timing: TimingInput!) {
    addTiming(timing: $timing) {
      id
      name
      printValue
    }
  }
`;

export const EDIT_TIMING = gql`
  mutation editTiming($timing: TimingInput!) {
    editTiming(timing: $timing) {
      id
      name
      printValue
    }
  }
`;
