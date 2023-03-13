import { Image } from '../../entity/Image';
import { User } from '../../entity/User';

export class CommentPayloadDTO {
  userId: number;

  imageId: number;

  content: string;
}

export interface GetCommentDTO {
  content: string;
  user: User;
  image: Image;
}
