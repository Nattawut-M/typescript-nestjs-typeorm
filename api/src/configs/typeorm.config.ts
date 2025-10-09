import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Comment } from 'src/items/entities/comment.entity';
import { Item } from 'src/items/entities/item.entity';
import { Listing } from 'src/items/entities/listing.entity';
import { Tag } from 'src/items/entities/tag.entity';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow<string>('MYSQL_HOST'),
  port: configService.getOrThrow<number>('MYSQL_PORT'),
  database: configService.getOrThrow<string>('MYSQL_DATABASE'),
  username: configService.getOrThrow<string>('MYSQL_USERNAME'),
  password: configService.getOrThrow<string>('MYSQL_ROOT_PASSWORD'),
  migrations: ['src/migrations/**/*.{ts,js}'], // specify migrations files
  entities: [Item, Comment, Listing, Tag], // manually specify entities
});
