import { ApiProperty } from "@nestjs/swagger"

export class GetPromoDto {
    @ApiProperty({example: 12})
    id: number

    @ApiProperty({example: "name"})
    name: string

    @ApiProperty({example: "desc"})
    description: string
}