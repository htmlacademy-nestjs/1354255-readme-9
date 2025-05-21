import { Comment } from './comment.interface';
import { PostType } from './post.type';

type PostT = (typeof PostType)[keyof typeof PostType]

export interface Post {
  id?: string;
  type: PostT;
  authorId: string;
  published: boolean;
  reposted: boolean;
  originalId?: string;
  originalAuthorId?: string;
  tags: string[];
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}
