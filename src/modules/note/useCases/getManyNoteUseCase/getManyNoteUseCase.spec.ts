import { makeUser } from "src/modules/user/factories/userFactory";
import { NoteRepositoryInMemory } from "../../repositories/noteRepositoryInMemory"
import { makeNote } from "../../factories/noteFactory";
import { GetManyNoteUseCase } from "./getManyNoteUseCase";
import { Note } from "../../entities/note";
import { randomUUID } from "crypto";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getManyNoteUseCase: GetManyNoteUseCase;

describe("Get many Notes", () => {

    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory()
        getManyNoteUseCase = new GetManyNoteUseCase(noteRepositoryInMemory)
    })

    it('Should be able to get many note', async () => {
        const user = makeUser({
            id: randomUUID()
        })
        const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

        noteRepositoryInMemory.notes = notes

        const result = await getManyNoteUseCase.execute({
            userId: user.id
        })

        expect(result).toEqual(notes)
    })

    it("Should be able to get only user notes", async () => {
        const user1 = makeUser({
            id: randomUUID()
        })
        const user2 = makeUser({
            id: randomUUID()
        })
        const notes = [...new Array(10)].map((_, index) => makeNote({ userId: index < 5 ? user1.id : user2.id }))

        noteRepositoryInMemory.notes = notes

        const result = await getManyNoteUseCase.execute({
            userId: user1.id
        })

        expect(result).toHaveLength(5)
    })

    it("Should be able to control notes per page", async () => {
        const user = makeUser({
            id: randomUUID()
        })
        const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }))

        noteRepositoryInMemory.notes = notes

        const result = await getManyNoteUseCase.execute({
            userId: user.id,
            perPage: "8"
        })

        expect(result).toHaveLength(8)
    })

    it("Should be able to control note page", async () => {
        const user = makeUser({
            id: randomUUID()
        })
        const notes = [...new Array(10)].map((_, index) => makeNote({ userId: user.id, title: index < 5 ? "page 1" : "page 2" }))

        noteRepositoryInMemory.notes = notes

        let results: Note[];
        
        results = await getManyNoteUseCase.execute({
            userId: user.id,
            perPage: "5",
            page: "2"
        })

        expect(results[0].title).toEqual("page 2")

        results = await getManyNoteUseCase.execute({
            userId: user.id,
            perPage: "5",
            page: "1"
        })

        expect(results[0].title).toEqual("page 1")
    })
})