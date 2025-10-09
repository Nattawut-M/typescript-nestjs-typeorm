import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDTO } from '../dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateCommentDTO) {
    return await this.repository.save(new Comment(dto));
  }

  async delete(id: number) {
    return await this.repository.delete({ id });
  }
}
