import { Note } from "../entities/note"

type Override = Partial<Note>

export const makeNote = ({id, ...override}: Override) => {
    return new Note({
        title: "Dar like no video",
        userId: "FakeId",
        description: "Se inscreva",
        ...override
    },
        id
    )
}