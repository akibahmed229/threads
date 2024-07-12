import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_NOTE } from "../../graphsql/UserMutation";
import { useState } from "react";

const NoteForm = ({ authorId }: { authorId: string }) => {
  //  new note section
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [userNoteFrom, { loading: formLoading, error: formError }] =
    useMutation(CREATE_NOTE, {
      onCompleted: () => {},
      onError: (err: ApolloError) => {
        console.error("Error registering user:", err.message);
        console.error("GraphQL Error Details:", err.graphQLErrors);
      },
    });

  const handleUserNoteFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userNoteFrom({ variables: { title, note, authorId } });
    setTitle("");
    setNote("");
  };

  return (
    <>
      <form
        className="flex flex-col w-full p-10 space-y-4"
        onSubmit={handleUserNoteFrom}
      >
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note"
          className="p-2 border rounded-md min-h-40 resize-x"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition self-end"
          type="submit"
        >
          Save Note
        </button>
      </form>
    </>
  );
};

export default NoteForm;
