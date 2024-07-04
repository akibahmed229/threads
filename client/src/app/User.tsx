import { useLocation } from "react-router-dom"; // Import useLocation

const User = () => {
  const location = useLocation(); // Use useLocation to access state
  const user = location.state.user; // Extract user data from state

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">User Profile</h1>
      <p className="text-xl">ID: {user.id}</p>
      <p className="text-xl">First Name: {user.firstName}</p>
      <p className="text-xl">Last Name: {user.lastName}</p>
      <p className="text-xl">Email: {user.email}</p>
      {user.profileImageURL && (
        <img
          src={user.profileImageURL}
          alt="Profile"
          className="rounded-full w-32 h-32 mt-4"
        />
      )}
    </div>
  );
};

export default User;
