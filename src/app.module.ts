import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Image } from './entity/Image';
import { Comment } from './entity/Comment';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { RouterModule } from '@nestjs/core';
import { ImageModule } from './image/image.module';

import { AuthMiddleware } from './auth/auth.middleware';
import { CommentModule } from './comment/comment.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SaveImageModule } from './save-image/save-image.module';
import { SaveImage } from './entity/SaveImage';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'capstone_user',
      entities: [User, Image, Comment, SaveImage],
      synchronize: true,
      migrations: ['dist/migrations/*.js'],
    }),
    UserModule,
    AuthModule,
    ImageModule,
    CommentModule,
    SaveImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/signUp', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
