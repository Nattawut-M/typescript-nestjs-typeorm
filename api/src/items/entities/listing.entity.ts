import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  rating: number;

  @OneToOne(() => Item, (item) => item.listing)
  item: Item

  constructor(listing: Partial<Listing>) {
    Object.assign(this, listing);
  }
}
