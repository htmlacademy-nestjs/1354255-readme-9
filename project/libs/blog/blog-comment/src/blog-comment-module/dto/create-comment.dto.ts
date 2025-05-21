import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

import { CommentLength } from './comment.constant';
import { CreateCommentDtoDocs } from './create-comment.docs';

export class CreateCommentDto {
  @ApiProperty(CreateCommentDtoDocs.Text)
  @IsString()
  @Length(CommentLength.MIN, CommentLength.MAX)
  public text: string;

  @ApiProperty(CreateCommentDtoDocs.PostId)
  @IsUUID()
  public postId: string;

  @ApiProperty(CreateCommentDtoDocs.AuthorId)
  @IsUUID()
  public authorId: string;
}
