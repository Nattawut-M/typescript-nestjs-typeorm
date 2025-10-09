import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';
import { CommentSubscriber } from './entities/comment.subscriber';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/controller.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Listing, Comment, Tag])],
  controllers: [ItemsController, CommentController],
  providers: [ItemsService, CommentService, CommentSubscriber],
})
export class ItemsModule {}
