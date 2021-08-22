import { Store } from './Store';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Page extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    startPageNumber: number;

    @Column()
    status: string;

    @ManyToOne(() => Store, (store) => store.pages)
    store: Store;
}
