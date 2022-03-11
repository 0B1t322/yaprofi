import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateParicapanetDro {
    @ApiProperty()
    @IsString()
    name: string
}