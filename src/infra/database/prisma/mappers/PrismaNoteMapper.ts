import { Note as NoteRaw } from "@prisma/client";
import { Note } from "src/modules/Note/entities/Note";

export class PrismaNoteMapper {
    static toPrisma(note: Note): NoteRaw {
        const {
            id,
            title,
            description,
            createdAt,
            userId,
        } = note;

        return {
            id,
            title,
            description,
            createdAt,
            userId,
        }
    }

    static toDomain(note: NoteRaw): Note {
        const {
            id,
            title,
            description,
            createdAt,
            userId,
        } = note;

        return new Note(
          {
            title,
            description,
            createdAt,
            userId,
          },
          id,
        );
      }
}