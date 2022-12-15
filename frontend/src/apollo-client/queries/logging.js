import gql from 'graphql-tag';
export const LIST_LOGGING = gql`
  query (
    $offset: Int
    $limit: Int
    $userId: ID
    $dateFrom: Date
    $dateTo: Date
    $model: LoggingModel
    $tagName: String
  ) {
    logging(
      offset: $offset
      limit: $limit
      userId: $userId
      dateFrom: $dateFrom
      dateTo: $dateTo
      model: $model
      tagName: $tagName
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
export const LIST_LOGGING_TAG = gql`
  {
    loggingTags {
      name
      model
      displayName
    }
  }
`;
