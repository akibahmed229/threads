export const typeDefs = `#graphql
        scalar DateTime
        type User {
            id: ID!
            firstName: String!
            lastName: String!
            email: String!
            profileImageURL: String
        }
        
        type Note {
            noteId: ID!
            title: String!
            note: String!
            createdAt: DateTime!
            updatedAt: DateTime!
            author: User!
        }
`;
