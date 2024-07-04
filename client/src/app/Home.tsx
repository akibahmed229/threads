import React, { useState } from "react";
import { useLazyQuery, gql, ApolloError } from "@apollo/client";

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

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userLastName, setLastFirstName] = useState("");
  const [haveAccount, setHaveAccount] = useState(true);
  const [user, setUser] = useState(null); // State to hold user data

  const [loginUser, { loading, error }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      setUser(data.userLogin); // Store user data in state upon successful login

      console.log("Login successful:", data.userLogin);
    },
    onError: (err: ApolloError) => {
      console.error("Error fetching login:", err.message);
      console.error("GraphQL Error Details:", err.graphQLErrors);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "Login attempt with email:",
      userEmail,
      "and password:",
      password,
    );

    loginUser({ variables: { email: userEmail, password } });

    setUserEmail("");
    setPassword("");
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
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
                setFirstName(e.target.value)
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
                setLastFirstName(e.target.value)
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <div className="text-white">
          {/* Display other user data */}
          <p>
            Welcome back, {user.firstName} {user.lastName}!
          </p>
          <p>Your email is: {user.email}</p>
          <p>Your id is: {user.id}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
