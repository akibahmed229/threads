import { useEffect, useState } from "react";

// user-defined imports
import { Note, User } from "../type/default";
import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_NOTES } from "../graphsql/UserQuery";
import NoteShowAll from "./notes/NoteShowAll";
import { CREATE_NOTE } from "../graphsql/UserMutation";

const UserNotes = ({ user }: User) => {
  const [notes, setNotes] = useState<Note[]>([]); // State to store user notes
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null); // State to track hovered note ID

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

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

  const [userNoteFrom, { loading: formLoading, error: formError }] =
    useMutation(CREATE_NOTE, {
      onCompleted: () => {},
      onError: (err: ApolloError) => {
        console.error("Error registering user:", err.message);
        console.error("GraphQL Error Details:", err.graphQLErrors);
      },
    });

  const handleGetUserNotes = () => {
    userNotes({
      variables: {
        authorId: user.id,
      },
    });
  };

  const handleNoteUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userNoteFrom({
      variables: {
        title,
        note: noteContent,
        authorId: user.id,
      },
    });

    setTitle("");
    setNoteContent("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    userNotes({
      variables: {
        authorId: user.id,
      },
    });
  }, [userNotes, user.id]);

  return (
    <div className="flex flex-col flex-grow justify-center w-[70vw] p-4 min-h-screen bg-gray-600 shadow-lg">
      <div className="flex flex-col flex-grow items-center min-h-screen mt-10">
        <div className="flex justify-around w-full">
          <h1 className={`text-4xl mb-4`}>{user.firstName}'s Notes</h1>
          <h1
            className={`text-4xl mb-4 cursor-pointer`}
            onClick={() => setIsModalOpen(true)}
          >
            ❌
          </h1>
        </div>
        <NoteShowAll
          notes={notes}
          setHoveredNoteId={setHoveredNoteId}
          hoveredNoteId={hoveredNoteId}
        />

        {/* Conditional Rendering based on noteToggle state */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen w-screen"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-gray-500 p-6 rounded-lg shadow-lg w-1/2 h-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
              <form
                onSubmit={handleNoteUpdate}
                className="flex flex-col space-y-4"
              >
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="p-2 border rounded-md"
                />
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Note"
                  className="p-2 border rounded-md h-40 resize-none"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotes;
