import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../user/dto/CreateUserDTO';
import { failCode, successCode } from '../utils/response';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,

    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userDetail: CreateUserDTO) {
    const { email, password } = userDetail;
    const checkUser = await this.userRepository.findOneBy({ email: email });

    if (checkUser) {
      failCode({}, 'User existed');
    } else {
      const user = {
        email,
        password: bcrypt.hashSync(password, 10),
      };

      const newUser = this.userRepository.create({
        ...user,
        createdAt: new Date(),
      });

      await this.userRepository.save(newUser);
      successCode(newUser, 'Create Success');
    }
  }

  async login(email: string, password: string) {
    const checkUser = await this.userRepository.findOneBy({
      email: email,
    });

    if (checkUser) {
      const checkPass = bcrypt.compareSync(password, checkUser.password);
      if (checkPass) {
        const token = this.jwtService.sign(
          { checkUser },
          {
            secret: this.config.get('SECRET_KEY'),
            expiresIn: '24h',
          },
        );
        successCode(token, 'Login successfully');
      } else {
        failCode({ email, password }, 'Wrong password');
      }
    } else {
      failCode({ email, password }, 'Wrong Email');
    }
  }
}
