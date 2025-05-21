import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentService } from './blog-comment.service';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogCommentRepository, BlogCommentService, BlogCommentFactory],
  controllers: [BlogCommentController],
  exports: [BlogCommentService],
})
export class BlogCommentModule { }
