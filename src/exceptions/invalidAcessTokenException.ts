import { HttpStatus } from "@nestjs/common";
import { AppException, AppExceptionProps } from "./appException";


export class invalidAcessTokenException extends AppException {
    constructor() {
        super({
            message: "Acess token inválido au expirado",
            status: HttpStatus.UNAUTHORIZED,
        })
    }
}