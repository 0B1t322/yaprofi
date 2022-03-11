import { ApiProperty } from "@nestjs/swagger";

export class GetParticapentDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string
}