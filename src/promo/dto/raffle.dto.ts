import { ApiProperty } from "@nestjs/swagger";

export class WinnetDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string
}

export class PrizeDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    description: string
}

export class RaffleDto {
    @ApiProperty(
        {type: WinnetDto}
    )
    winner: WinnetDto

    @ApiProperty(
        {type: PrizeDto}
    )
    prize: PrizeDto
}