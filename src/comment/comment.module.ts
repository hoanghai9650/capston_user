import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entity/Comment';
import { User } from '../entity/User';
import { Image } from '../entity/Image';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Image])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
