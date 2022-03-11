import { BadRequestException, Body, CallHandler, ConflictException, Controller, Delete, ExecutionContext, Get, NestInterceptor, NotFoundException, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Observable, catchError, NotFoundError } from 'rxjs';
import { CreatePromoDto } from './dto/crate-promo.dto';
import { CreateParicapanetDro } from './dto/create-particapent.dto';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { GetPromoDto } from './dto/get-promo.dto';
import { GetPromoResp } from './dto/get-promos.dto';
import { RaffleDto } from './dto/raffle.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoService, PromoServiceErrors } from './promo.service';

class PromoControllerErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                catchError(
                    (err: any) => {
                        switch(err) {
                            case PromoServiceErrors.PromoNotFound:
                                throw new BadRequestException("Promo not found")
                            case PromoServiceErrors.CantRaffle:
                                throw new ConflictException("Can't raffle")
                            default:
                                throw err
                        }
                    }
                )
            )
    }

}

@UseInterceptors(PromoControllerErrorInterceptor)
@Controller('promo')
export class PromoController {
    constructor(
        private readonly promoService: PromoService
    ) {}

    @Post("")
    @ApiOperation({summary: "create promo"})
    @ApiBody({type: CreatePromoDto, description: "body"})
    @ApiResponse({type: Number, status: 201})
    async createPromo(@Body() req: CreatePromoDto): Promise<number> {
        const created = await this.promoService.createPromo(req)
        return created.id
    }

    @Get("")
    @ApiOperation({summary: "get promos"})
    @ApiResponse({type: [GetPromoDto], status: 200})
    async getPromos(): Promise<GetPromoDto[]> {
        return this.promoService.getPromos()
    }

    @Put("/:id")
    @ApiParam({name: "id", type: Number, description: "id of promo"})
    @ApiBody({type: UpdatePromoDto})
    async updatePromo(@Param('id') id: number, @Body() req: UpdatePromoDto) {
        await this.promoService.updatePromo(id, req)
    }

    @Delete("/:id")
    @ApiParam({name: "id", type: Number, description: "id of promo"})
    async deletePromo(@Param('id') id: number) {
        const isDeleted = await this.promoService.deletePromo(id)
        if(!isDeleted) {
            throw new BadRequestException("Promo not found")
        }
    }

    @Get("/:id")
    @ApiParam({name: "id", type: Number, description: "id of promo"})
    @ApiResponse({type: GetPromoResp, status: 200})
    async getPromo(@Param('id') id: number) {
        return this.promoService.getPromo(id)
    }

    @Post("/:id/participant")
    @ApiParam({name: "id", type: Number, description: "id of promo"})
    @ApiBody({type: CreateParicapanetDro})
    @ApiResponse({type: Number, status: 201})
    async createParticapent(@Param('id') id: number, @Body() req: CreateParicapanetDro) {
        const particapent = await this.promoService.addParticipant(id, req)
        return particapent.id
    }

    @Delete('/:promoId/participant/:participantId')
    @ApiParam({name: "promoId", type: Number, description: "id of promo"})
    @ApiParam({name: "participantId", type: Number, description: "id of particapant"})
    async deleteParticapent(@Param('promoId') promoId: number, @Param('participantId') id) {
        const isDeleted = await this.promoService.deleteParticapent(promoId, id)
        if(!isDeleted) {
            throw new NotFoundException("not found particapent or promo")
        }
    }

    @Post('/:id/prize')
    @ApiParam({name: "id", type: Number, description: "id of promo"})
    @ApiBody({type: CreatePrizeDto})
    @ApiResponse({type: Number})
    async createPrize(@Param('id') id: number, @Body() req: CreatePrizeDto): Promise<number> {
        const created = await this.promoService.addPrize(id, req)
        return created.id
    }

    @Delete('/:promoId/prize/:prizeId')
    @ApiParam({name: "promoId", type: Number, description: "id of promo"})
    @ApiParam({name: "prizeId", type: Number, description: "id of prize"})
    async deletePrize(@Param('promoId') promoId: number, @Param('prizeId') prizeId: number) {
        const isDeleted = await this.promoService.deletePrize(promoId, prizeId)
        if(!isDeleted) {
            throw new NotFoundException("not found prize or promo")
        }
    }

    @Post('/:id/raffle')
    @ApiParam({name: "id", type: Number, description: "id of promo"})
    @ApiResponse({type: RaffleDto, status: 200})
    async raffle(@Param('id') id: number): Promise<RaffleDto[]> {
        return await this.promoService.raffle(id)
    }
}
