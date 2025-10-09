import { CreateCommentDTO } from './comment.dto';
import { CreateListingDTO } from './listing.dto';
import { CreateTagDto } from './tag.dto';

export class CreateItemDto {
  name: string;
  isPublic: boolean;
  listing: CreateListingDTO;
  comments: CreateCommentDTO[];
  tags: CreateTagDto[];
}
