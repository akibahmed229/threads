import { ApolloServer, BaseContext } from "@apollo/server";
import { GraphQLScalarType, Kind } from "graphql";

// Import the user module
import { user } from "../user";

// Define the DateTime scalar
const dateScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "A date and time, represented as an ISO-8601 string",
  serialize(value: any) {
    // Convert outgoing Date to DateString
    return value instanceof Date
      ? `${value.toDateString()} ${value.toLocaleTimeString()}`
      : null;
  },
});

export const createApolloServer = async () => {
  // Define the schema
  const typeDefs = `#graphql
    ${user.typeDefs}

    type Query {
        ${user.queries} 
    }

    type Mutation{
        ${user.mutation}
    }
  `;
  // Define the resolvers for the schema
  const resolvers = {
    DateTime: dateScalar,
    Query: {
      ...user.resolvers.queries,
    },
    Mutation: {
      ...user.resolvers.mutation,
    },
  };

  // create graphql server
  const server = new ApolloServer<BaseContext>({
    typeDefs, // schema
    resolvers, // resolvers
  });

  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  return server;
};
