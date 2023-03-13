import { User } from '../../entity/User';

export class GetImageDTO {
  id: number;
  imageName: string;
  link: string;
  description: string;
  user: User;
}

export class PostImageDTO {
  imageName: string;
  link: string;
  description: string;
  userId: number;
}
