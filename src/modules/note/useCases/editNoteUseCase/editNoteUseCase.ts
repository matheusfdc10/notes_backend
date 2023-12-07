import { Injectable } from "@nestjs/common";
import { NoteRepository } from "../../repositories/NoteRepository";
import { NoteNotFoundException } from "../../exceptions/NoteNotFoundException";
import { NoteWitoutPermissionException } from "../../exceptions/NoteWitoutPermissionException";

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

        if (!note) throw new NoteNotFoundException()

        if (note.userId !== userId) throw new NoteWitoutPermissionException({
            actionName: "editar"
        })

        note.title = title
        note.description = description ?? null

        await this.noteRepository.save(note);

        return note;
    }
}