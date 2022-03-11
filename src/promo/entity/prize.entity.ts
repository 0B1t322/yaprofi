import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Promo } from "./promo.entity";

@Entity()
export class Prize {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @ManyToOne(() => Promo, promo => promo.prizes)
    promo: Promo
}