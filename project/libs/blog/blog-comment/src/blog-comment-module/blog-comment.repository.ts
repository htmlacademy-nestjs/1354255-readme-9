import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { BasePostgresRepository } from '@project/data-access';
import { Comment } from '@project/shared/core';

import { CommentError, MAX_COMMENT_LIMIT } from './blog-comment.constant';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<
  BlogCommentEntity,
  Comment
> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(postId: string): Promise<BlogCommentEntity[]> {
    const documents = await this.client.comment.findMany({
      take: MAX_COMMENT_LIMIT,
      where: {
        postId,
      },
    });

    if (!documents.length) {
        throw new NotFoundException(CommentError.CommentsNotFound);
    }

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: BlogCommentEntity): Promise<void> {
    await this.client.comment.update({
      where: { id: entity.id },
      data: {
        text: entity.text,
      },
    });
  }
}
