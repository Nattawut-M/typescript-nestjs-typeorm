import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from './listing.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

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

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  @JoinColumn()
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.items, { cascade: true })
  @JoinTable()
  tags: Tag[];

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}
