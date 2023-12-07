import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/isStringCustom";

export class EditNoteBody {
    @IsStringCustom()
    @IsNotEmptyCustom()
    title: string;

    @IsStringCustom()
    @IsOptional()
    description: string;
}