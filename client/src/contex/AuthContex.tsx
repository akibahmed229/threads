import {
  createContext, // To create a context for authentication state
  useState, // To manage state in the AuthProvider component
  useContext, // To use the authentication context in other components
  ReactNode, // Type for React children prop
  useEffect, // To run side-effects in the AuthProvider component
} from "react";

// Define the shape of the authentication context
interface AuthContextType {
  isLogged: boolean; // To track if the user is logged in
  setIsLogged: (isLogged: boolean) => void; // To update the logged-in state
}

// Create the authentication context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide the authentication context to its children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to track if the user is logged in, initially read from localStorage
  const [isLogged, setIsLogged] = useState<boolean>(
    Boolean(localStorage.getItem("IsLoggedIn")), // Initialize with value from localStorage
  );

  // useEffect to synchronize the state with localStorage on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("IsLoggedIn");
    setIsLogged(isLoggedIn === "true"); // Set the state based on localStorage value
  }, []); // Empty dependency array means this effect runs once on mount

  // Provide the authentication state and updater function to the children
  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context in other components
export const useAuth = () => {
  // Retrieve the authentication context
  const context = useContext(AuthContext);
  // Throw an error if the hook is used outside of the AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // Return the context
  return context;
};
