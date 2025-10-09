import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from '../services/controller.service';
import { CreateCommentDTO } from '../dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDTO) {
    return this.service.create(createCommentDto);
  }

  @Delete(':id')
  delete(@Param(':id') id: number) {
    return this.service.delete(+id);
  }
}
