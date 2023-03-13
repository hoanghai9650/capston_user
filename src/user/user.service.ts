import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUser() {
    return this.userRepository.find();
  }

  async findUser(id: number) {
    const findUser = await this.userRepository.findOneBy({ id: id });
    if (findUser) {
      return findUser;
    } else {
      return null;
    }
  }

  async updateUserById(id: number, body: UpdateUserDTO) {
    const findUser = await this.findUser(id);
    if (!!findUser) {
      await this.userRepository.update({ id }, { ...body });
      throw new HttpException('Success', HttpStatus.OK);
    } else {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
  }
}
