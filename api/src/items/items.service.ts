import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ){}
  
  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);
    return await this.entityManager.save(item);
  }

  findAll() {
    return this.itemRepository.find();
  }
  findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    if (!item) return
    Object.assign(item, updateItemDto);
    return await this.entityManager.save(item);
  }

  async remove(id: number) {
    return await this.itemRepository.delete(id);
  }
}
