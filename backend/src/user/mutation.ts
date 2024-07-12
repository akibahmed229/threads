export const mutation = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): String
    updateUser(firstName: String, lastName: String, email: String!, password: String, profileImageURL: String): User
    
    createNote(title: String!, note: String!, authorId: String!): Note
    deleteNote(noteId: String!): Boolean
    updateNote(noteId: String!, title: String, note: String): Note
`;
