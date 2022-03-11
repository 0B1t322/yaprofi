import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Promo } from "./promo.entity";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Promo, promo => promo.participants)
    promo: Promo
}