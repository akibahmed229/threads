import { gql } from "@apollo/client";

// GraphQL mutation to register the user
export const REGISTER_USER = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`;

export const EDIT_PROFILE = gql`
  mutation Mutation(
    $email: String!
    $lastName: String
    $firstName: String
    $profileImageURL: String
  ) {
    updateUser(
      email: $email
      lastName: $lastName
      firstName: $firstName
      profileImageURL: $profileImageURL
    ) {
      id
      email
      firstName
      lastName
      profileImageURL
    }
  }
`;

// GraphQL mutation to create a new note
export const CREATE_NOTE = gql`
  mutation Mutation($title: String!, $note: String!, $authorId: String!) {
    createNote(title: $title, note: $note, authorId: $authorId) {
      noteId
      title
      note
    }
  }
`;

// GraphQL mutation to delete a note by ID
export const DELETE_NOTE = gql`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId)
  }
`;

// GraphQL mutation to update a note by ID
export const UPDATE_NOTE = gql`
  mutation UpdateNote($noteId: String!, $title: String, $note: String) {
    updateNote(noteId: $noteId, title: $title, note: $note) {
      noteId
      title
      note
      createdAt
      updatedAt
    }
  }
`;
