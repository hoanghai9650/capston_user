import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './Image';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryColumn({ type: 'int', name: 'user_id', unsigned: false })
  userId: number;

  @PrimaryColumn({ type: 'int', name: 'image_id', unsigned: false })
  imageId: number;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Image, (image) => image.comment)
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  image: Image;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;
}
