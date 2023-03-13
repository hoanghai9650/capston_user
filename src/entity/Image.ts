import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { SaveImage } from './SaveImage';

@Entity()
export class Image {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: false })
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: true })
  imageName: string;

  @Column('varchar', { name: 'link', length: 255, nullable: true })
  link: string;

  @Column('varchar', { name: 'description', length: 255, nullable: true })
  description: string;

  @OneToMany(() => Comment, (comment) => comment.image)
  comment: Comment[];

  @ManyToOne(() => User, (user) => user.image, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => SaveImage, (save) => save.image)
  saveImage: SaveImage[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
