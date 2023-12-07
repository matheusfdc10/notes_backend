import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { NoteNotFoundException } from "../../exceptions/NoteNotFoundException";
import { NoteWitoutPermissionException } from "../../exceptions/NoteWitoutPermissionException";

interface GetNoteRequest {
    noteId: string;
    userId: string;
}

@Injectable()
export class GetNoteUseCase {
    constructor(private noteRepository: NoteRepository) {}

    async execute({ noteId, userId }: GetNoteRequest) {
        const note = await this.noteRepository.findById(noteId)

        if (!note) throw new NoteNotFoundException()

        if (note.userId !== userId) throw new NoteWitoutPermissionException({
            actionName: "recuperar"
        })

        return note;
    }
}