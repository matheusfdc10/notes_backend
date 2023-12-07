import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { NoteNotFoundException } from "../../exceptions/NoteNotFoundException";
import { NoteWitoutPermissionException } from "../../exceptions/NoteWitoutPermissionException";

interface DeleteNoteRequest {
    noteId: string
    userId: string
}

@Injectable()
export class DeleteNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ noteId, userId }: DeleteNoteRequest) {
        const note = await this.noteRepository.findById(noteId)

        if (!note) throw new NoteNotFoundException()

        if (note.userId !== userId) throw new NoteWitoutPermissionException({
            actionName: "deletar"
        })

        await this.noteRepository.delete(noteId)
    }
}