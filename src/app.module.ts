import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Participant } from './promo/entity/participant.entity';
import { Prize } from './promo/entity/prize.entity';
import { Promo } from './promo/entity/promo.entity';
import { Result } from './promo/entity/result.entity';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'profi',
        entities: [
            Promo,
            Participant,
            Prize,
            Result,
        ],
        synchronize: true,
      }),
      PromoModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
