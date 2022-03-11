import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateIf } from "class-validator";

export class CreatePromoDto {
    @ApiProperty({required: true})
    @IsString({message: "name field sjould be string"})
    name: string

    @ApiProperty({required: false})
    @ValidateIf(o => o.descripption)
    @IsString({message: "description field should be string"})
    description?: string
}