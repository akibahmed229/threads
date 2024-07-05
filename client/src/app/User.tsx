import { useLocation } from "react-router-dom"; // Import useLocation
import UserProfile from "./UserProfile";
import UserNotes from "./UserNotes";

const User = () => {
  const location = useLocation(); // Use useLocation to access state
  const user = location.state.user; // Extract user data from state

  return (
    <div className="flex flex-row h-screen ">
      {/* User Profile Section */}
      <UserProfile user={user} />

      {/* User Notes Section */}
      <UserNotes user={user} />
    </div>
  );
};

export default User;
