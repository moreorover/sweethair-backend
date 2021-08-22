import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Page } from './Page';

@Entity()
export class Store extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    url: string;

    @OneToMany(() => Page, (page) => page.store, { cascade: true })
    pages: Page[];
}
