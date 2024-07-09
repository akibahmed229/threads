export const mutation = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): String
    updateUser(firstName: String, lastName: String, email: String!, password: String, profileImageURL: String): User
    
    createNote(title: String!, note: String!, authorId: String!): Note
`;
