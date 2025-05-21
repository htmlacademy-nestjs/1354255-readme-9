import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Comment } from '@project/shared/core';
import { CommentRdoDocs } from './comment.docs';

export class CommentRdo implements Comment {
  @ApiProperty(CommentRdoDocs.Id)
  @Expose()
  public id: string;

  @ApiProperty(CommentRdoDocs.Text)
  @Expose()
  public text: string;

  @ApiProperty(CommentRdoDocs.PostId)
  @Expose()
  public postId: string;

  @ApiProperty(CommentRdoDocs.AuthorId)
  @Expose()
  public authorId: string;

  @ApiProperty(CommentRdoDocs.CreatedAt)
  @Expose()
  public createdAt: Date;
}
