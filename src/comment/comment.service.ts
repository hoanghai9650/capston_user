import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entity/Comment';
import { Repository } from 'typeorm';
import { CommentPayloadDTO, GetCommentDTO } from './dto/comment.dto';

import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { notFoundCode, successCode, failCode } from '../utils/response';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  getComment(id: number): Promise<GetCommentDTO> {
    return this.commentRepository.findOne({
      relations: { user: true, image: true },
      where: {
        imageId: id,
      },
    });
  }

  async comment(payload: CommentPayloadDTO) {
    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    const image = await this.imageRepository.findOneBy({
      id: payload.imageId,
    });
    const findImage = await this.imageRepository.findOne({
      where: { user: { id: payload.userId }, id: payload.imageId },
    });

    if (findImage && user && image) {
      const newComment = this.commentRepository.create({
        ...payload,
        user,
        image,
      });

      const upload = await this.commentRepository.save(newComment);

      successCode(upload, 'Comment Successfully');
    } else {
      notFoundCode('User or Image not found');
    }
  }
}
