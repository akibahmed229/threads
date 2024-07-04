import { ApolloServer, BaseContext } from "@apollo/server";
import { user } from "../user";

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
