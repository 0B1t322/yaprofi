import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { Prize } from "./prize.entity";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Prize, prize => prize)
    prize: Prize
    

    @OneToOne(() => Participant, particapent => particapent)
    participant: Participant
}