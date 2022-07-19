import { IsEmpty, IsUUID } from 'class-validator';
import { UserModel } from 'src/user/models/user.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserClubModel } from './userClub.model';

@Entity({ name: 'clubs' })
export class ClubModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty()
  @IsUUID('4')
  id?: string;

  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 50,
    name: 'max_members',
  })
  maxMembers: number;

  @ManyToOne(() => UserModel, { nullable: false })
  @JoinColumn({ name: 'owner' })
  owner: UserModel;

  @OneToMany((type) => UserClubModel, (user) => user, { nullable: true })
  @JoinColumn({ name: 'users' })
  users: UserClubModel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
