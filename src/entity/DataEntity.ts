import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class DataEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    modifiedOn: Date;
}
