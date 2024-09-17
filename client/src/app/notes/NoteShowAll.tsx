import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Note } from "../../type/default";
import { DELETE_NOTE, UPDATE_NOTE } from "../../graphsql/UserMutation";

const NoteShowAll = ({
  notes,
  setHoveredNoteId,
  hoveredNoteId,
}: {
  notes: Note[];
  hoveredNoteId: string | null;
  setHoveredNoteId: (noteId: string | null) => void;
}) => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    onCompleted: () => {},
    onError: (err) => {
      console.error("Error deleting note:", err.message);
      console.error("GraphQL Error Details:", err.graphQLErrors);
    },
  });

  const [updateNote] = useMutation(UPDATE_NOTE, {
    onCompleted: () => {},
    onError: (err) => {
      console.error("Error updating note:", err.message);
      console.error("GraphQL Error Details:", err.graphQLErrors);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleNoteDeletion = (noteId: string) => {
    deleteNote({
      variables: {
        noteId,
      },
    });
  };

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setNoteContent(note.note);
    setIsModalOpen(true);
  };

  const handleNoteUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNote({
      variables: {
        noteId: editingNote?.noteId,
        title,
        note: noteContent,
      },
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full">
        {notes.map((note: Note) => {
          return (
            <div
              className="hover:shadow-lg"
              key={note.noteId}
              onMouseEnter={() => setHoveredNoteId(note.noteId)}
              onMouseLeave={() => setHoveredNoteId(null)}
            >
              <div className="flex flex-col w-full p-4 bg-gray-500 rounded-md mb-4">
                <div className="flex justify-between mt-2 pr-4 pl-4">
                  <p className="text-sm">
                    <strong>Created At:</strong> {note.createdAt}
                  </p>
                  <p className="text-sm">
                    <strong>Updated At:</strong> {note.updatedAt}
                  </p>
                </div>

                <div className="p-4">
                  <h1 className="text-2xl font-bold">{note.title}</h1>
                  <p className="text-lg">{note.note}</p>
                </div>

                <div
                  className={`flex justify-end transform transition-all duration-300 ${
                    hoveredNoteId === note.noteId
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-0"
                  }`}
                >
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleNoteDeletion(note.noteId)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600 transition"
                    onClick={() => handleEditClick(note)}
                  >
                    Edit Note
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
            <div className="flex justify-between mt-4">
              <p>
                <strong>Created At:</strong> {editingNote?.createdAt}
              </p>
              <p>
                <strong>Updated At:</strong> {editingNote?.updatedAt}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteShowAll;
