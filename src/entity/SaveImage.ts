import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Image } from './Image';

@Entity()
export class SaveImage {
  @PrimaryColumn({
    type: 'int',
    name: 'user_id',
    unsigned: false,
  })
  userId: number;

  @PrimaryColumn({
    type: 'int',
    name: 'image_id',
    unsigned: false,
  })
  imageId: number;

  //   @Column({ type: 'date', name: 'save_date', unsigned: false })
  @CreateDateColumn()
  saveDate: Date;

  @ManyToOne(() => User, (user) => user.saveImage)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Image, (image) => image.saveImage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  image: Image;
}
