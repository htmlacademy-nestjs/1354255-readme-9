import { Post } from './post.interface';

export interface LinkPost extends Post {
  content: {
    url: string;
    description?: string;
  };
}
