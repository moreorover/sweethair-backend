import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class DataEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    modifiedOn: Date;
}
