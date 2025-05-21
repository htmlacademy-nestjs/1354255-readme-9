export interface Comment {
  id?: string;
  authorId: string;
  postId: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}
