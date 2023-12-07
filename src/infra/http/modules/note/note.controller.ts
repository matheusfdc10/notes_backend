import { Body, Controller, Param, Post, Put, Request, Delete, Get, Query } from "@nestjs/common";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/createNoteUseCase";
import { AuthenticatedRequestModel } from "../auth/models/authenticatedRequestModel";
import { CreateNoteBody } from "./dtos/CreateNoteBody";
import { NoteViewModel } from "./viewModels/NoteViewModel";
import { EditNoteUseCase } from "src/modules/note/useCases/editNoteUseCase/editNoteUseCase";
import { EditNoteBody } from "./dtos/EditNoteBody";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/getNoteUseCase";
import { GetManyNoteUseCase } from "src/modules/note/useCases/getManyNoteUseCase/getManyNoteUseCase";

@Controller("notes")
export class NoteController {
    constructor(
        private createNoteUseCase: CreateNoteUseCase,
        private editNoteUseCase: EditNoteUseCase,
        private deleteNoteUseCase: DeleteNoteUseCase,
        private getNoteUseCase: GetNoteUseCase,
        private getManyNoteUseCase: GetManyNoteUseCase,
    ) {}
    
    @Post()
    async createNote(
        @Request() request: AuthenticatedRequestModel,
        @Body() body: CreateNoteBody
    ) {
        const { title, description } = body;

        const note = await this.createNoteUseCase.execute({
            title: title,
            description: description,
            userId: request.user.id
        })

        return NoteViewModel.toHttp(note)
    }

    @Put(":id")
    async editNote(
        @Request() request: AuthenticatedRequestModel,
        @Param("id") noteId: string,
        @Body() body: EditNoteBody
    ) {
        const { title, description } = body;
        
        await this.editNoteUseCase.execute({
            userId: request.user.id,
            noteId,
            title,
            description,
        })
    }

    @Delete(":id")
    async deleteNote(
        @Request() request: AuthenticatedRequestModel,
        @Param("id") noteId: string,
    ) {
        
        await this.deleteNoteUseCase.execute({
            userId: request.user.id,
            noteId,
        })
    }

    @Get(":id")
    async getNote(
        @Request() request: AuthenticatedRequestModel,
        @Param("id") noteId: string,
    ) {
        const note = await this.getNoteUseCase.execute({
            userId: request.user.id,
            noteId,
        })

        return NoteViewModel.toHttp(note)
    }

    @Get()
    async getManyNote(
        @Request() request: AuthenticatedRequestModel,
        @Query("page") page: string,
        @Query("perPage") perPage: string,
    ) {
        const notes = await this.getManyNoteUseCase.execute({
            userId: request.user.id,
            page,
            perPage
        })

        return notes.map(NoteViewModel.toHttp)
    }
}