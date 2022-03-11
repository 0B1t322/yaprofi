import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePrizeDto {
    @ApiProperty()
    @IsString()
    description: string
}