import { useState } from "react";

const UserNotes = ({
  user,
}: {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageURL: string;
  };
}) => {
  const [noteToggle, setNoteToggle] = useState(false); // State to toggle between viewing and adding notes

  return (
    <div className="flex flex-col justify-center w-[70vw] p-4 h-screen bg-gray-600 shadow-lg">
      <div className="flex flex-col items-center min-h-screen mt-20">
        <div className="flex justify-around w-full">
          <h1
            className={`text-4xl mb-4 cursor-pointer ${noteToggle ? "" : "border-b-4 border-blue-500 font-bold"}`}
            onClick={() => setNoteToggle(false)}
          >
            {user.firstName}'s Notes
          </h1>
          <h1
            className={`text-4xl mb-4 cursor-pointer ${noteToggle ? "border-b-4 border-blue-500 font-bold" : ""}`}
            onClick={() => setNoteToggle(true)}
          >
            Add a Note
          </h1>
        </div>

        {/* Conditional Rendering based on noteToggle state */}
        {noteToggle ? (
          <form className="flex flex-col w-full p-10">
            <input
              type="text"
              placeholder="Title"
              className="p-2 m-2 border-2 border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Note"
              className="p-2 m-2 border-2 border-gray-300 rounded-md"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition self-end">
              Save Note
            </button>
          </form>
        ) : (
          <div className="w-full">
            <p className="text-xl mb-4">No notes available</p>
            {/* Placeholder for user notes */}
            {/* Add mapping over user notes here when available */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotes;
