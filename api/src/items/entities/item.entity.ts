import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'is_public', default: true })
  isPublic: boolean;

  // casecade: true will allowed to inserted, updated, and deleted the listing from item
  @OneToOne(() => Listing, (listing) => listing.item, { cascade: true })
  @JoinColumn() // use to specify the owner of the relationship
  listing: Listing;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}
