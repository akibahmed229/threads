import { prismaClient } from "../lib/db";
import UserService from "./user";

// Define the payload interface for creating a note
export interface CreateNotePayload {
  authorId: string;
  title: string;
  note: string;
}

export interface UpdateNotePayload {
  noteId: string;
  title: string;
  note: string;
}

// Service class for handling notes-related operations
class NotesService {
  // Static method to create a new note
  public static async createNote(payload: CreateNotePayload) {
    // Destructure the payload to extract title, note, and authorId
    const { title, note, authorId } = payload;

    // Use Prisma client to create a new note record in the database
    return await prismaClient.note.create({
      data: {
        authorId,
        title,
        note,
      },
    });
  }

  public static async updateNote(payload: UpdateNotePayload) {
    const { noteId, title, note } = payload;

    const existingNote = await NotesService.getNoteById(noteId);

    if (!existingNote) {
      throw new Error("Note not found");
    }

    return await prismaClient.note.update({
      where: {
        noteId,
      },
      data: {
        title: title || existingNote.title,
        note: note || existingNote.note,
      },
    });
  }

  // Static method to retrieve notes for a specific user
  public static async getUserNotes(authorId: string) {
    // Use Prisma client to find all notes with the specified authorId
    return await prismaClient.note.findMany({
      where: {
        authorId,
      },
    });
  }

  private static async getNoteById(noteId: string) {
    return await prismaClient.note.findUnique({
      where: {
        noteId,
      },
    });
  }

  public static async deleteNoteById(noteId: string) {
    const note = await NotesService.getNoteById(noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    return await prismaClient.note.delete({
      where: {
        noteId,
      },
    });
  }
}

// Export the NotesService class for use in other parts of the application
export default NotesService;
