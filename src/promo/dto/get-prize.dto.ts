import { ApiProperty } from "@nestjs/swagger";

export class GetPrizeDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    description: string
}