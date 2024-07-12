import UserService, {
  CreateUserPayload,
  GetUserPayload,
  UpdateUserPayload,
} from "../services/user";
import NotesService, {
  CreateNotePayload,
  UpdateNotePayload,
} from "../services/notes";

const queries = {
  // User service
  getUserToken: async (
    _: any,
    payload: { email: string; password: string },
  ) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });

    return token;
  },
  getCurrentLoggedInUser: async (_: any, parametrs: any, context: any) => {
    if (!context && !context.user) {
      throw new Error("User not found");
    }
    const id = context.user.id;
    const user = UserService.getUserById(id);

    return user;
  },
  userLogin: async (_: any, payload: GetUserPayload) => {
    const user = await UserService.userLogin(payload);

    return user;
  },

  // Note service
  getUserNotes: async (_: any, payload: { authorId: string }) => {
    const { authorId } = payload;
    const notes = await NotesService.getUserNotes(authorId);

    return notes;
  },
};

const mutation = {
  // User service
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);

    return res.id;
  },
  updateUser: async (_: any, payload: UpdateUserPayload) => {
    const res = await UserService.updateUser(payload);

    return res;
  },

  // Note service
  createNote: async (_: any, payload: CreateNotePayload) => {
    const res = await NotesService.createNote(payload);

    return res;
  },
  deleteNote: async (_: any, payload: { noteId: string }) => {
    const { noteId } = payload;
    const res = await NotesService.deleteNoteById(noteId);

    return res;
  },
  updateNote: async (_: any, payload: UpdateNotePayload) => {
    const res = await NotesService.updateNote(payload);

    return res;
  },
};

export const resolvers = { queries, mutation };
