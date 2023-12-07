import { randomUUID } from "crypto";
import { NoteRepositoryInMemory } from "../../repositories/noteRepositoryInMemory"
import { EditNoteUseCase } from "./editNoteUseCase";
import { makeNote } from "../../factories/noteFactory";
import { makeUser } from "src/modules/user/factories/userFactory";
import { NoteNotFoundException } from "../../exceptions/NoteNotFoundException";
import { NoteWitoutPermissionException } from "../../exceptions/NoteWitoutPermissionException";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe("Create Note", () => {

    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory)
    })

    it('Should be able to create edit note', async () => {
        const user = makeUser({})
        const note = makeNote({
            userId: user.id
        })

        noteRepositoryInMemory.notes = [note]

        const titleChange = "title changed"
        const descriptionChange = "description change"

        await editNoteUseCase.execute({
            title: titleChange,
            description: descriptionChange,
            noteId: note.id,
            userId: user.id
        })

        expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChange)
        expect(noteRepositoryInMemory.notes[0].description).toEqual(descriptionChange)
    })

    it("Should be able to throw error when not found note", async () => {
        expect(async () => {
            await editNoteUseCase.execute({
                title: "se inscreva de novo",
                noteId: randomUUID(),
                userId: randomUUID()
            })
        }).rejects.toThrowError(NoteNotFoundException)
    })

    it("Should be able to throw error when note has another user", async () => {
        const note = makeNote({})

        noteRepositoryInMemory.notes = [note]

        expect(async () => {
            await editNoteUseCase.execute({
                title: "se inscreva de novo",
                noteId: note.id,
                userId: randomUUID()
            })
        }).rejects.toThrowError(NoteWitoutPermissionException)
    })
})