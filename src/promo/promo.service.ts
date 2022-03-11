import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';
import { Participant } from './entity/participant.entity';
import { Prize } from './entity/prize.entity';
import { Promo } from './entity/promo.entity';

export const PromoServiceErrors = {
    PromoNotFound: Error("PromoNotFound"),
    CantRaffle: Error("Cant Raffle")
}

export interface Raffle {
    winner: {id: number, name: string}
    prize: {id: number, description: string}
}

@Injectable()
export class PromoService {
    constructor(
        @InjectRepository(Promo)
        private readonly promoRepo: Repository<Promo>,

        @InjectRepository(Participant)
        private readonly partRepo: Repository<Participant>,

        @InjectRepository(Prize)
        private readonly prizeRepo: Repository<Prize>,
    ) {

    }


    async createPromo(req: {name: string, description?: string}): Promise<Promo> {
        const promo = new Promo()
        promo.name = req.name
        if(req.description) {
            promo.description = req.description
        }

        return this.promoRepo.save(
            promo
        )
    }


    async getPromos(): Promise<Promo[]> {
        return this.promoRepo.find()
    }

    async updatePromo(id: number, req: {name?: string, description?: string}): Promise<Promo> {
        const get = await this.promoRepo.findOne(id)
        if(get === undefined) {
            throw PromoServiceErrors.PromoNotFound
        }

        if(req.name) {
            get.name = req.name
        }

        get.description = req.description

        this.promoRepo.update(id, get)

        return get
    }

    async deletePromo(id: number): Promise<boolean> {
        await this.prizeRepo.delete(
            {
                promo: {
                    id: id
                }
            }
        )

        await this.partRepo.delete(
            {
                promo: {
                    id: id,
                }
            }
        )

        const result = await this.promoRepo.delete(id)
        if (result.affected == 0) {
            return false
        }

        return true
    }

    async addParticipant(id: number, req: {name: string}): Promise<Participant> {
        const get = await this.promoRepo.findOne(
            id,
            {
                relations: ["participants"],
            }
        )
        if(get === undefined) {
            throw PromoServiceErrors.PromoNotFound
        }


        const part = new Participant()
        part.promo = get
        part.name = req.name
        

        return this.partRepo.save(part)
    }

    async getPromo(id: number): Promise<Promo> {
        const get = await this.promoRepo.findOne(
            id,
            {
                relations: [
                    "participants",
                    "prizes"
                ],
            }
        )
        if(get === undefined) {
            throw PromoServiceErrors.PromoNotFound
        }

        return get
    }

    async deleteParticapent(promoId: number, id: number): Promise<boolean> {
        const result = await this.partRepo.delete(
            {
                id: id,
                promo: {
                    id: promoId,
                }
            }
        )

        if (result.affected == 0) {
            return false
        }

        return true
    }

    async addPrize(id: number, req: {description: string}): Promise<Prize> {
        const get = await this.promoRepo.findOne(
            id,
            {
                relations: ["prizes"],
            }
        )
        if(get === undefined) {
            throw PromoServiceErrors.PromoNotFound
        }

        const prize = new Prize()
        prize.description = req.description
        prize.promo = get

        return this.prizeRepo.save(prize)
    }

    async deletePrize(promoId: number, id: number): Promise<boolean> {
        const result = await this.prizeRepo.delete(
            {
                id: id,
                promo: {
                    id: promoId
                }
            }
        )

        if (result.affected == 0) {
            return false
        }

        return true
    }

    async raffle(id: number): Promise<Raffle[]> {
        const get = await this.promoRepo.findOne(
            id,
            {
                relations: [
                    "participants",
                    "prizes",
                ]
            }
        )
        if(get === undefined) {
            throw PromoServiceErrors.PromoNotFound
        }

        if(get.participants.length != get.prizes.length || (get.participants.length == 0 && get.prizes.length == 0)) {
            throw PromoServiceErrors.CantRaffle
        }
        
        const shuffledParts = this.shuffleArray(get.participants)
        const shuffledPrizes = this.shuffleArray(get.prizes)

        const raffle: Raffle[] = []

        for(let i = 0; i < shuffledParts.length; i++) {
            raffle.push(
                {
                    winner: shuffledParts[i],
                    prize: shuffledPrizes[i]
                }
            )
        }

        return raffle
    }

    private shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array
    }
}

