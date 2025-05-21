import { Comment, Entity, StorableEntity } from '@project/shared/core';

export class BlogCommentEntity
  extends Entity
  implements StorableEntity<Comment> {
  public text: string;
  public authorId: string;
  public postId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment) {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.text = comment.text;
    this.authorId = comment.authorId;
    this.postId = comment.postId;
    this.createdAt = comment.createdAt ?? undefined;
    this.updatedAt = comment.updatedAt ?? undefined;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      text: this.text,
      authorId: this.authorId,
      postId: this.postId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
