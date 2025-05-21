import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentRepository } from './blog-comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor(private readonly blogCommentRepository: BlogCommentRepository) { }

  public async getComment(id: string): Promise<BlogCommentEntity> {
    return this.blogCommentRepository.findById(id);
  }

  public async getAllComments(id: string): Promise<BlogCommentEntity[]> {
    return await this.blogCommentRepository.find(id);
  }

  public async createComment(
    dto: CreateCommentDto
  ): Promise<BlogCommentEntity> {
    const newComment = new BlogCommentEntity(dto);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this.blogCommentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }


}
