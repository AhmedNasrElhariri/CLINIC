import gql from 'graphql-tag';

export const LIST_TIMINGS = gql`
  {
    myTimings {
      id
      name
      englishPrintValue
      arabicPrintValue
    }
  }
`;

export const ADD_TIMING = gql`
  mutation addTiming($timing: TimingInput!) {
    addTiming(timing: $timing) {
      id
      name
      englishPrintValue
      arabicPrintValue
    }
  }
`;

export const EDIT_TIMING = gql`
  mutation editTiming($timing: TimingInput!) {
    editTiming(timing: $timing) {
      id
      name
      englishPrintValue
      arabicPrintValue
    }
  }
`;
