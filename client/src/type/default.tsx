export interface User {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageURL: string;
  };
}

export interface Note {
  noteId: string;
  note: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
