import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Note } from "../../entities/note";
import { NoteRepository } from "../../repositories/NoteRepository";

interface EditNoteRequest {
    title: string;
    description?: string;
    noteId: string;
    userId: string;
}

@Injectable()
export class EditNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ title, description, noteId, userId }: EditNoteRequest) {
        const note = await this.noteRepository.findById(noteId)

        if (!note) throw new NotFoundException()

        if (note.userId !== userId) throw new UnauthorizedException()

        note.title = title
        note.description = description ?? null

        await this.noteRepository.save(note);

        return note;
    }
}