import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateIf } from "class-validator";

export class UpdatePromoDto {
    @ApiProperty({required: false})
    @ValidateIf(o => o.name)
    @IsString()
    name?: string

    @ApiProperty({required: false})
    @ValidateIf(o => o.description)
    @IsString()
    description?: string
}