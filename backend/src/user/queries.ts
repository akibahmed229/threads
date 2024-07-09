export const queries = `#graphql
        getUserToken(email: String!, password: String!): String
        getCurrentLoggedInUser: User
        userLogin(email: String!, password: String!): User
        
        getUserNotes(authorId: String!): [Note]
`;
