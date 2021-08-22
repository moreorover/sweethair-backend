import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Price } from './Price';

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    upc: string;

    @Column()
    title: string;

    @Column()
    url: string;

    @Column({ default: '' })
    image: string;

    @Column({ default: false })
    isDeal: boolean;

    @OneToMany(() => Price, (price) => price.item, { cascade: true, onDelete: 'CASCADE' })
    prices: Price[];

    currentPrice(): number {
        const sortedPrices = this.prices.sort((a, b) => {
            if (a.createdOn > b.createdOn) {
                return 1;
            }

            if (a.createdOn < b.createdOn) {
                return -1;
            }

            return 0;
        });

        return sortedPrices[sortedPrices.length - 1].price;
    }
}
