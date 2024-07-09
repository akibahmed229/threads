import { Outlet, useLocation } from "react-router-dom"; // Import useLocation

// user-defined imports
import UserProfile from "./UserProfile";
import UserNotes from "./UserNotes";

const User = () => {
  const location = useLocation(); // Use useLocation to access state
  const user = location.state.user; // Extract user data from state

  return (
    <>
      <div className="flex flex-row min-h-screen bg-gradient-to-r from-slate-500 to-slate-800">
        {/* User Profile Section */}
        <UserProfile user={user} />

        {/* User Notes Section */}
        <UserNotes user={user} />
      </div>

      <Outlet />
    </>
  );
};

export default User;
