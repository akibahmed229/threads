import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { createApolloServer } from "./graphql";
import UserService from "./services/user";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// This async function initializes the Express application and Apollo Server
const init = async () => {
  const app = express(); // Create an instance of an Express application
  const PORT = 5000; // Define the port on which the server will run

  app.use(bodyParser.json()); // Middleware to parse incoming JSON requests
  app.use(
    cors<cors.CorsRequest>({
      origin: "*",
    }),
  ); // Middleware to enable CORS (Cross-Origin Resource Sharing)

  // Create the Apollo Server by calling the function from the graphql module
  const server = await createApolloServer();

  // Specify the path where the Apollo Server will be mounted and add middleware
  app.use(
    "/graphql",
    express.json(), // Middleware to parse JSON bodies
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // Extract the token from the request headers
        const token = req.headers["token"];
        try {
          // Decode the token to get the user information
          const user = UserService.decodeJWToken(token as string);
          return { user }; // Add the user information to the context
        } catch (error) {
          return {}; // If there's an error, return an empty context
        }
      },
    }),
  );

  // Define a simple GET route for the root URL
  app.get("/", (req, res) => {
    res.send("Hello World!"); // Respond with "Hello World!" for root requests
  });

  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`); // Log the server's URL
  });
};

// Call the init function to start the server
init();
