import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/databases/abstract.entity';
import { Item } from './item.entity';

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column()
  name: string;

  @Column({ nullable: true })
  detail: string;

  @ManyToMany(() => Item, (item) => item.tags)
  items: Item[];

  constructor(tag: Partial<Tag>) {
    super(tag);
    Object.assign(this, tag);
  }
}
