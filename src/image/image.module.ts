import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entity/Image';
import { User } from '../entity/User';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image, User]), UserModule],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
