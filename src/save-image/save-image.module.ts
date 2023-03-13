import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SaveImageService } from './save-image.service';
import { SaveImageController } from './save-image.controller';
import { SaveImage } from '../entity/SaveImage';
import { User } from '../entity/User';
import { Image } from '../entity/Image';

@Module({
  imports: [TypeOrmModule.forFeature([SaveImage, User, Image])],
  providers: [SaveImageService],
  controllers: [SaveImageController],
})
export class SaveImageModule {}
