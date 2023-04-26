import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
query getPosts {
  getPosts {
    _id
    body
    createdAt
    image
    likes {
      _id
      createdAt
      username
    }
    username
  }
}
`;