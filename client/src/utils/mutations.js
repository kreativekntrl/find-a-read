import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      book {
        _id
        title
        authors
        description
        bookId
        link
        image
      }
    }
  }
`;