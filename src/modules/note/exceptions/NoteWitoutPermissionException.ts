import { HttpStatus } from "@nestjs/common";
import { Interface } from "readline";
import { AppException } from "src/exceptions/appException";

interface NoteWitoutPermissionExceptionProps {
    actionName: string;
}

export class NoteWitoutPermissionException extends AppException {
    constructor({ actionName }: NoteWitoutPermissionExceptionProps) {
        super({
            message: `Sem permissão para ${actionName} anotação`,
            status: HttpStatus.UNAUTHORIZED,
        })
    }
}