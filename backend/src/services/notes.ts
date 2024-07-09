import { prismaClient } from "../lib/db";

export interface CreateNotePayload {
  title: string;
  note: string;
  authorId: string;
}

class NotesService {
  public static async createNote(payload: CreateNotePayload) {
    const { title, note, authorId } = payload;

    return await prismaClient.note.create({
      data: {
        title,
        note,
        authorId,
      },
    });
  }

  public static async getUserNotes(authorId: string) {
    return await prismaClient.note.findMany({
      where: {
        authorId,
      },
    });
  }
}

export default NotesService;
