import { gql } from "@apollo/client";

// GraphQL query to log in the user
export const LOGIN_USER = gql`
  query UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      profileImageURL
    }
  }
`;

// GraphQL query to get user notes
export const GET_USER_NOTES = gql`
  query Query($authorId: String!) {
    getUserNotes(authorId: $authorId) {
      noteId
      note
      title
      createdAt
      updatedAt
    }
  }
`;
