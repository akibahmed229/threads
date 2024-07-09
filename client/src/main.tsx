import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Import user-defined components
import Navbar from "./components/Navbar.tsx";
import Home from "./app/Home.tsx";
import User from "./app/User.tsx";
import Error from "./app/Error.tsx";
import Footer from "./components/Footer.tsx";
import { AuthProvider } from "./contex/AuthContex.tsx"; // Import AuthProvider from context

// Create Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // GraphQL server URI
  cache: new InMemoryCache(),
});

// Create routing configuration using createBrowserRouter | Navbar -> Home -> Footer | Navbar -> User -> Footer
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <Navbar />, // Render Navbar component
    errorElement: <Error />, // Render Error component if there's an error
    children: [
      {
        path: "/", // Nested path for Home
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Footer />,
          },
        ],
      },
      {
        path: "/user", // Path for User
        element: <User />,
        children: [
          {
            path: "/user", // Nested path for User
            element: <Footer />,
          },
        ],
      },
    ],
  },
]);

// Render the application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap entire app with AuthProvider to provide authentication context */}
    <AuthProvider>
      {/* Provide Apollo Client instance to entire app */}
      <ApolloProvider client={client}>
        {/* Provide routing configuration to entire app */}
        <RouterProvider router={router} />
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
);
