import { Post } from './post.interface';

export interface VideoPost extends Post {
  content: {
    title: string;
    url: string;
  };
}
