import { Post } from './post.interface';

export interface TextPost extends Post {
  content: {
    title: string;
    description: string;
    text: string;
  };
}
