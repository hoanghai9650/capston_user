import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ImageService } from './image.service';
import { PostImageDTO } from './dto/image.dto';

@Controller('image')
@UseInterceptors(ClassSerializerInterceptor)
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  getImage() {
    return this.imageService.getImage();
  }

  @Post('/upload')
  postImage(@Body() imagePayload: PostImageDTO) {
    return this.imageService.postImage(imagePayload);
  }

  @Get('/by-id/:id')
  getImageByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.getImageByUserId(id);
  }

  @Get(':id')
  getImageById(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.getImageById(id);
  }
  @Delete(':id')
  deleteImageById(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.deleteImageById(id);
  }
}
