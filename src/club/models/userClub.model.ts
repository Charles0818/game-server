import { Type } from 'class-transformer';
import { IsEmpty, IsUUID } from 'class-validator';
import { UserModel } from 'src/user/models/user.model';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClubModel } from './clubs.model';

@Entity({ name: 'user_clubs' })
export class UserClubModel {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  @IsEmpty()
  id: string;

  @ManyToOne(() => UserModel, (user) => user.clubs)
  @JoinColumn({ name: 'user' })
  user: UserModel;

  @ManyToOne(() => ClubModel, (club) => club.users, { eager: true })
  @JoinColumn({ name: 'club' })
  club: ClubModel;

  @CreateDateColumn({ name: 'created_date' })
  @Type(() => Date)
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  @Type(() => Date)
  updatedDate: Date;

  constructor(userClub: Partial<UserClubModel>) {
    Object.assign(this, userClub);
  }
}
