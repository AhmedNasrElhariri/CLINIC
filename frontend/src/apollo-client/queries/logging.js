import gql from 'graphql-tag';
export const LIST_LOGGING = gql`
  query (
    $offset: Int
    $limit: Int
    $userId: ID
    $dateFrom: Date
    $dateTo: Date
  ) {
    logging(
      offset: $offset
      limit: $limit
      userId: $userId
      dateFrom: $dateFrom
      dateTo: $dateTo
    ) {
      logging {
        id
        text
        user {
          name
          id
        }
        date
      }
      loggingCount
    }
  }
`;
