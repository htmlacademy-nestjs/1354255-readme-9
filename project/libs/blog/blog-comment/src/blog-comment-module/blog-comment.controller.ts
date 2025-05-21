import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { BlogCommentService } from './blog-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('comments')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) { }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const commentEntity = await this.blogCommentService.getComment(id);
    return fillDto(CommentRdo, commentEntity.toPOJO());
  }

  @Get('/')
  public async showAll(@Body('postId') postId: string) {
    const blogCommentEntities = await this.blogCommentService.getAllComments(postId);
    const comments = blogCommentEntities.map((blogComment) =>
      blogComment.toPOJO()
    );
    return fillDto(CommentRdo, comments);
  }

  @Post('/')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogCommentService.deleteComment(id);
  }
}
