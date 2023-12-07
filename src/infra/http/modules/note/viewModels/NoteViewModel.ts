import { Note } from "src/modules/note/entities/note";

export class NoteViewModel {
    static toHttp({ id, title, description, createdAt }: Note) {
        return {
            id,
            title,
            description,
            createdAt
        }
    }
}