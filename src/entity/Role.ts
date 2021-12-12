import { Column, Entity } from 'typeorm';
import { DataEntity } from './DataEntity';

@Entity()
export class Role extends DataEntity {
  @Column()
  name: string;
}
