import { useState } from "react";
import { useLazyQuery, gql, ApolloError, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// GraphQL query to log in the user
const LOGIN_USER = gql`
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

// GraphQL mutation to register the user
const REGISTER_USER = gql`
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

const Home = () => {
  // State variables for login and registration forms
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [haveAccount, setHaveAccount] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Lazy query for logging in the user
  const [loginUser, { loading: loginLoading, error: loginError }] =
    useLazyQuery(LOGIN_USER, {
      onCompleted: (data) => {
        navigate("/user", { state: { user: data.userLogin } }); // Navigate to /user with user data
        console.log("Login successful:", data.userLogin);
      },
      onError: (err: ApolloError) => {
        console.error("Error fetching login:", err.message);
        console.error("GraphQL Error Details:", err.graphQLErrors);
      },
    });

  // Mutation for registering the user
  const [registering, { loading: registerLoadaing, error: registerError }] =
    useMutation(REGISTER_USER, {
      onCompleted: () => {
        setHaveAccount(true); // Set haveAccount to true after successful registration to show login form
        console.log("User registered successfully:");
      },
      onError: (err: ApolloError) => {
        console.error("Error registering user:", err.message);
        console.error("GraphQL Error Details:", err.graphQLErrors);
      },
    });

  // Handler for login form submission
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({ variables: { email: userEmail, password } }); // Execute login query
    setUserEmail("");
    setPassword("");
  };

  // Handler for registration form submission
  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registering({
      variables: {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password,
      },
    }); // Execute registration mutation
    setUserFirstName("");
    setUserLastName("");
    setUserEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Conditional rendering of login or registration form based on haveAccount state */}
      {haveAccount ? (
        <div className="bg-gradient-to-r from-slate-500 to-slate-800 rounded-xl p-10 m-10">
          <p className="text-4xl font-bold">Please login to continue</p>
          <form
            className="mt-3.5 flex flex-col text-xl w-full"
            onSubmit={handleLogin}
          >
            <label htmlFor="email" className="m-2">
              Enter your Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="p-2 m-2 border-2 border-gray-500 rounded-md"
              value={userEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserEmail(e.target.value)
              }
              required
            />
            <label htmlFor="password" className="m-2 text-xl">
              Enter your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="p-2 m-2 border-2 border-gray-500 rounded-md"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 m-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-slate-500 to-slate-800 rounded-xl p-10 m-10">
          <p className="text-4xl font-bold">Please register to continue</p>
          <form
            className="mt-3.5 flex flex-col text-xl w-full"
            onSubmit={handleRegistration}
          >
            <label htmlFor="firstName" className="m-2 text-xl">
              Enter your First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="p-2 m-2 border-2 border-gray-500 rounded-md"
              value={userFirstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserFirstName(e.target.value)
              }
              required
            />
            <label htmlFor="lastName" className="m-2 text-xl">
              Enter your Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 m-2 border-2 border-gray-500 rounded-md"
              value={userLastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserLastName(e.target.value)
              }
              required
            />
            <label htmlFor="email" className="m-2">
              Enter your Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="p-2 m-2 border-2 border-gray-500 rounded-md"
              value={userEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserEmail(e.target.value)
              }
              required
            />
            <label htmlFor="password" className="m-2 text-xl">
              Enter your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="p-2 m-2 border-2 border-gray-500 rounded-md"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 m-2 rounded-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      )}

      {/* Toggle between login and registration forms */}
      <div className="mb-5">
        {haveAccount ? (
          <p className="text-gray-300">
            Don't have an account?
            <button
              className="cursor-pointer ml-1 underline text-black"
              onClick={() => setHaveAccount(false)}
            >
              Register
            </button>
          </p>
        ) : (
          <p className="text-gray-300">
            Already have an account?
            <button
              className="cursor-pointer ml-1 underline text-black"
              onClick={() => setHaveAccount(true)}
            >
              Login
            </button>
          </p>
        )}
      </div>

      {/* Loading and error messages */}
      {(loginLoading || registerLoadaing) && <p>Loading...</p>}
      {loginError && (
        <p className="text-red-500">Error: {loginError.message}</p>
      )}
      {registerError && (
        <p className="text-red-500">Error: {registerError.message}</p>
      )}
    </div>
  );
};

export default Home;
