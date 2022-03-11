import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entity/participant.entity';
import { Prize } from './entity/prize.entity';
import { Promo } from './entity/promo.entity';
import { Result } from './entity/result.entity';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Prize, Result, Promo, Participant])
    ],
    controllers: [PromoController],
    providers: [PromoService]
})
export class PromoModule {}
