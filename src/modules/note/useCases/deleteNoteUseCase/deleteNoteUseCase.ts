import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Note } from "../../entities/note";
import { NoteRepository } from "../../repositories/NoteRepository";

interface DeleteNoteRequest {
    noteId: string
    userId: string
}

@Injectable()
export class DeleteNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ noteId, userId }: DeleteNoteRequest) {
        const note = await this.noteRepository.findById(noteId)

        if (!note) throw new NotFoundException()

        if (note.userId !== userId) throw new UnauthorizedException()

        await this.noteRepository.delete(noteId)
    }
}