import { IsEmpty, IsUUID } from 'class-validator';
import { UserModel } from 'src/user/models/user.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClubModel } from './clubs.model';

@Entity({ name: 'club_messages' })
export class ClubMessageModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty()
  @IsUUID('4')
  id: string;

  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'author' })
  author: UserModel;

  @ManyToOne(() => ClubModel)
  @JoinColumn({ name: 'club' })
  club: ClubModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
