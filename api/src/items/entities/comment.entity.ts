import { AbstractEntity } from 'src/databases/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comments, { onDelete: 'CASCADE' })
  item: Item;

  constructor(comment: Partial<Comment>) {
    super(comment);
    Object.assign(this, comment);
  }
}
