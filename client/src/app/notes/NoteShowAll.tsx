import { Note } from "../../type/default";

const NoteShowAll = ({
  notes,
  setHoveredNoteId,
  hoveredNoteId,
}: {
  notes: Note;
  hoveredNoteId: string | null;
  setHoveredNoteId: (noteId: string | null) => void;
}) => {
  return (
    <>
      <div className="w-full">
        {/* Add mapping over user notes here when available */}
        {notes.map((note) => {
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
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>

                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600 transition">
                    Edit Note
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NoteShowAll;
