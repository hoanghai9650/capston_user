import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/UpdateserDTO';

@Controller('/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    return this.userService.updateUserById(id, body);
  }
}
