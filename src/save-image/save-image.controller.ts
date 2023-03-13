import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SaveImageService } from './save-image.service';
import { savePayloadDTO } from './dto/save-image.dto';

@Controller('save-image')
export class SaveImageController {
  constructor(private saveImageService: SaveImageService) {}
  @Post()
  saveImage(@Body() savePayload: savePayloadDTO) {
    return this.saveImageService.saveImage(savePayload);
  }

  @Get('by-image/:id')
  checkSaveImageByImageId(@Param('id', ParseIntPipe) id: number) {
    return this.saveImageService.checkSaveImageByImageId(id);
  }

  @Get('by-user/:id')
  getSaveImageByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.saveImageService.getSaveImageByUserId(id);
  }
}
