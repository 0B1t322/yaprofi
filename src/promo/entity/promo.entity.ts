import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { Prize } from "./prize.entity";

@Entity()
export class Promo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({nullable: true})
    description: string

    @OneToMany(() => Prize, prize => prize.promo)
    prizes?: Prize[]

    @OneToMany(() => Participant, part => part.promo)
    participants?: Participant[]
}