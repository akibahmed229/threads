import { useEffect, useState } from "react";

// user-defined imports
import { Note, User } from "../type/default";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_USER_NOTES } from "../graphsql/UserQuery";
import NoteForm from "./notes/NoteForm";
import NoteShowAll from "./notes/NoteShowAll";

const UserNotes = ({ user }: User) => {
  const [noteToggle, setNoteToggle] = useState(false); // State to toggle between viewing and adding notes
  const [notes, setNotes] = useState<Note[]>([]); // State to store user notes
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null); // State to track hovered note ID

  const [userNotes, { loading: notesLoading, error: noteError }] = useLazyQuery(
    GET_USER_NOTES,
    {
      onCompleted: (data) => {
        setNotes(data.getUserNotes);
      },
      onError: (err: ApolloError) => {
        console.error("Error registering user:", err.message);
        console.error("GraphQL Error Details:", err.graphQLErrors);
      },
    },
  );

  const handleGetUserNotes = () => {
    userNotes({ variables: { authorId: user.id } });
    setNoteToggle(false);
  };

  useEffect(() => {
    userNotes({ variables: { authorId: user.id } });
  }, [userNotes, user.id]);

  return (
    <div className="flex flex-col flex-grow justify-center w-[70vw] p-4 min-h-screen bg-gray-600 shadow-lg">
      <div className="flex flex-col flex-grow items-center min-h-screen mt-10">
        <div className="flex justify-around w-full">
          <h1
            className={`text-4xl mb-4 cursor-pointer ${
              noteToggle ? "" : "border-b-4 border-blue-500 font-bold"
            }`}
            onClick={handleGetUserNotes}
          >
            {user.firstName}'s Notes
          </h1>
          <h1
            className={`text-4xl mb-4 cursor-pointer ${
              noteToggle ? "border-b-4 border-blue-500 font-bold" : ""
            }`}
            onClick={() => setNoteToggle(true)}
          >
            Add a Note
          </h1>
        </div>

        {/* Conditional Rendering based on noteToggle state */}
        {noteToggle ? (
          <NoteForm authorId={user.id} />
        ) : (
          <NoteShowAll
            notes={notes}
            setHoveredNoteId={setHoveredNoteId}
            hoveredNoteId={hoveredNoteId}
          />
        )}
      </div>
    </div>
  );
};

export default UserNotes;
