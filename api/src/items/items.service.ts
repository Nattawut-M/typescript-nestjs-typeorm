import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDTO } from './dto/comment.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    // the entity manager is used to create a transaction, if an error occurs, the transaction will be rolled back
    await this.entityManager.transaction(async (entityManager) => {
      this.isWordIllegal(createItemDto.name);
      const listing = new Listing({
        ...createItemDto.listing,
        rating: 0,
      });
      const comments = createItemDto.comments.map(
        (comment) => new Comment(comment),
      );
      const tags = createItemDto.tags.map((tag) => new Tag(tag));
      const item = new Item({
        name: createItemDto.name,
        isPublic: createItemDto.isPublic,
        listing,
        comments,
        tags,
      });
      return await entityManager.save(item); // usage the entity manager from callback
    });
  }

  findAll() {
    return this.itemRepository.find();
  }
  findOne(id: number) {
    return this.itemRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true, tags: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    if (!item) return;
    Object.assign(item, updateItemDto);
    return await this.entityManager.save(item);
  }

  async remove(id: number) {
    return await this.itemRepository.delete(id);
  }

  async addComment(itemId: number, createCommentDto: CreateCommentDTO) {
    const item = await this.findOne(itemId);
    if (!item) return;

    const comment = new Comment(createCommentDto);
    item.comments.push(comment);

    return await this.entityManager.save(item);
  }

  private isWordIllegal(
    word: string,
    illegalWords: string[] = ['error', 'bad'],
  ) {
    if (!illegalWords.some((illegalWord) => word.includes(illegalWord))) return;
    throw new BadRequestException('Illegal word');
  }
}
