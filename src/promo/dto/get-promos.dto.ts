import { ApiProperty } from "@nestjs/swagger";
import { Participant } from "../entity/participant.entity";
import { Prize } from "../entity/prize.entity";
import { GetParticapentDto } from "./get-particapent.dto";
import { GetPrizeDto } from "./get-prize.dto";
import { GetPromoDto } from "./get-promo.dto";

export class GetPromoResp extends GetPromoDto {
    @ApiProperty(
        {type: [GetPrizeDto]}
    )
    prizes: Prize[]

    @ApiProperty(
        {type: [GetParticapentDto]}
    )
    participants: Participant[]
}