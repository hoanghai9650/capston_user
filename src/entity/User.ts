import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './Image';
import { Comment } from './Comment';
import { Exclude } from 'class-transformer';
import { SaveImage } from './SaveImage';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: false })
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: true })
  name: string;

  @Column({ type: 'int', name: 'age', unsigned: true, nullable: true })
  age: number;

  @Column('varchar', { length: 255, name: 'email', unique: true })
  email: string;

  @Exclude()
  @Column('varchar', { length: 255, name: 'password' })
  password: string;

  @Column('varchar', { length: 255, name: 'avatar', nullable: true })
  avatar: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Image, (image) => image.user)
  image: Image[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => SaveImage, (save) => save.user)
  saveImage: SaveImage[];
  //   @BeforeInsert()
  //   async hashPassword() {
  //     this.password = await argon2.hash(this.password, {
  //       type: argon2.argon2id,
  //       hashLength: 40,
  //     });
  //   }
}
