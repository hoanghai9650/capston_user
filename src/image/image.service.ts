import { Injectable, UseGuards } from '@nestjs/common';
import { Image } from '../entity/Image';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GetImageDTO, PostImageDTO } from './dto/image.dto';
import { User } from '../entity/User';
import { notFoundCode, successCode } from '../utils/response';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getImage(): Promise<Image[]> {
    return this.imageRepository.find({});
  }

  async getImageByUserId(id: number) {
    const user = await this.userRepository.find({
      where: {
        id: id,
      },
    });
    if (user) {
      const images = await this.imageRepository.find({
        where: {
          user: {
            id: id,
          },
        },
      });

      successCode(images, 'Successfully');
    }
    {
      notFoundCode('User not found');
    }
  }

  async getImageById(id: number): Promise<GetImageDTO> {
    const images = await this.imageRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    });
    if (images) {
      return images;
    } else {
      notFoundCode('Image not found');
    }
  }

  async postImage(imagePayload: PostImageDTO) {
    const user = await this.userRepository.findOneBy({
      id: imagePayload.userId,
    });
    if (user) {
      const newImage = this.imageRepository.create({
        ...imagePayload,
        user,
      });
      const upload = await this.imageRepository.save(newImage);
      successCode(upload, 'Create Successfully');
    } else {
      notFoundCode('User not found');
    }
  }

  async deleteImageById(id: number) {
    const image = await this.imageRepository.findOneBy({
      id: id,
    });
    if (image) {
      const deleteImage = await this.imageRepository.delete({ id: id });
      successCode(deleteImage, 'Deleted Successfully');
    } else {
      notFoundCode('Image not found');
    }
  }
}
