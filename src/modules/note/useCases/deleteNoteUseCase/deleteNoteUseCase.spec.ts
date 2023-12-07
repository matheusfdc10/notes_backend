import { randomUUID } from "crypto";
import { NoteRepositoryInMemory } from "../../repositories/noteRepositoryInMemory"
import { DeleteNoteUseCase } from "./deleteNoteUseCase";
import { makeUser } from "src/modules/user/factories/userFactory";
import { makeNote } from "../../factories/noteFactory";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe("Delete Note", () => {

    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory)
    })

    it('should be able to delete note', async () => {
        const user = makeUser({})
        const note = makeNote({
            userId: user.id
        })

        noteRepositoryInMemory.notes = [note]

        await deleteNoteUseCase.execute({
            noteId: note.id,
            userId: user.id
        })

        expect(noteRepositoryInMemory.notes).toHaveLength(0)
    })

    it("Should be able to throw error when not found note", async () => {
        expect(async () => {
            await deleteNoteUseCase.execute({
                noteId: randomUUID(),
                userId: randomUUID()
            })
        }).rejects.toThrowError(NotFoundException)
    })

    it("Should be able to throw error when note has another user", async () => {
        const note = makeNote({})


        noteRepositoryInMemory.notes = [note]

        expect(async () => {
            await deleteNoteUseCase.execute({
                noteId: note.id,
                userId: randomUUID()
            })
        }).rejects.toThrowError(UnauthorizedException)
    })
})