import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveImage } from '../entity/SaveImage';
import { Repository } from 'typeorm';
import { savePayloadDTO } from './dto/save-image.dto';
import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { notFoundCode, successCode, failCode } from '../utils/response';

@Injectable()
export class SaveImageService {
  constructor(
    @InjectRepository(SaveImage)
    private saveImageRepository: Repository<SaveImage>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async saveImage(savePayload: savePayloadDTO) {
    const user = await this.userRepository.findOneBy({
      id: savePayload.userId,
    });
    const image = await this.imageRepository.findOneBy({
      id: savePayload.imageId,
    });

    const findImage = await this.imageRepository.findOne({
      where: { user: { id: savePayload.userId }, id: savePayload.imageId },
    });

    if (findImage && user && image) {
      const saveImage = this.saveImageRepository.create({
        ...savePayload,
        user,
        image,
      });

      const upload = await this.saveImageRepository.save(saveImage);

      successCode(upload, 'Save Successfully');
    } else {
      notFoundCode('User or Image not found');
    }
  }

  async checkSaveImageByImageId(saveImage: number) {
    const checkImage = await this.imageRepository.findOneBy({ id: saveImage });

    if (checkImage) {
      const checkSaved = await this.saveImageRepository.findOne({
        where: {
          image: {
            id: saveImage,
          },
        },
      });
      if (checkSaved) {
        successCode(checkSaved, 'Image saved');
      } else {
        successCode(null, 'Image not saved');
      }
    } else {
      notFoundCode('Image not found');
    }
  }

  async getSaveImageByUserId(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (user) {
      const checkSaved = await this.saveImageRepository.find({
        relations: {
          image: true,
        },
        where: {
          user: {
            id: userId,
          },
        },
      });
      if (checkSaved) {
        successCode(checkSaved, 'Successfully');
      } else {
        successCode(checkSaved, 'Successfully');
      }
    } else {
      notFoundCode('User not found');
    }
  }
}
