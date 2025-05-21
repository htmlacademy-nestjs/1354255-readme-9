import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { CommentLength } from './comment.constant';
import { UpdateCommentDtoDocs } from './update-comment.docs';

export class UpdateCommentDto {
  @ApiProperty(UpdateCommentDtoDocs.Text)
  @IsString()
  @Length(CommentLength.MIN, CommentLength.MAX)
  public text: string;
}
