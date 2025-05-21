import { Post } from './post.interface';

export interface QuotePost extends Post {
  content: {
    quote: string;
    quoteAuthor: string;
  };
}
