import { useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";

// user-defined imports
import { EDIT_PROFILE } from "../graphsql/UserMutation";
import { User } from "../type/default";

import DefaultImage from "../assets/blank-avatar-photo-place-holder-600nw-1095249842.webp";

const UserProfile = ({ user }: User) => {
  const [editProfile, setEditProfile] = useState(false); // State to toggle between viewing and editing profile

  // Edit Profile section
  const [userLastName, setUserLastName] = useState(user.lastName || "");
  const [userFirstName, setUserFirstName] = useState(user.firstName || "");
  const [userPassword, setUserPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // Mutation for Edit the user profile
  const [updateProfile, { loading, error }] = useMutation(EDIT_PROFILE, {
    onCompleted: () => {
      setEditProfile(false);
      console.log("User profile updated successfully");
    },
    onError: (err: ApolloError) => {
      console.error("Error updating profile:", err.message);
      console.error("GraphQL Error Details:", err.graphQLErrors);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage(e.target.files![0]);
  };

  const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfile({
      variables: {
        email: user.email,
        firstName: userFirstName,
        lastName: userLastName,
        profileImage,
      },
    });

    setUserPassword("");
    setProfileImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen w-[20vw]">
      <div className="flex flex-col items-start w-full mt-7">
        {user.profileImageURL ? (
          <img
            src={user.profileImageURL}
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4 border-2 border-gray-300"
          />
        ) : (
          <img
            src={DefaultImage}
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4 border-2 border-gray-300"
          />
        )}

        <h1 className="text-4xl font-bold mb-4">{user.firstName}'s Profile</h1>
        <p className="text-xl mb-2">First Name: {user.firstName}</p>
        <p className="text-xl mb-2">Last Name: {user.lastName}</p>
        <p className="text-xl mb-2">Email: {user.email}</p>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md mt-4"
          onClick={() => setEditProfile(!editProfile)}
        >
          Edit Profile
        </button>

        {/* Conditional Rendering based on editProfile state */}
        {editProfile && (
          <>
            <form
              className="flex flex-col w-full mt-4"
              onSubmit={handleEditProfile}
            >
              <input
                type="text"
                placeholder="First Name"
                value={userFirstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserFirstName(e.target.value)
                }
                className="p-2 m-2 border-2 border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={userLastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserLastName(e.target.value)
                }
                className="p-2 m-2 border-2 border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserPassword(e.target.value)
                }
                className="p-2 m-2 border-2 border-gray-300 rounded-md"
              />
              <input
                type="file"
                placeholder="Profile Image"
                onChange={handleFileChange}
                className="p-2 m-2 border-2 border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition self-end">
                Save Changes
              </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error updating profile: {error.message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
