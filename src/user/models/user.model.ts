import { Exclude } from 'class-transformer';
import { IsEmpty, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { UserClubModel } from '../../club/models/userClub.model';
import { WalletModel } from '../../wallet/models/wallet.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

export enum GenderTypes {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'users' })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty()
  @IsUUID('4')
  id?: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({
    type: 'text',
  })
  lastName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  username?: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  phone: string;

  @Column({ enum: GenderTypes, nullable: true })
  gender?: string;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @Exclude()
  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @OneToMany(() => UserClubModel, (userClub) => userClub.user, {
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  clubs: UserClubModel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => WalletModel, (wallet) => wallet.user, { onDelete: 'CASCADE' })
  wallet?: WalletModel;
}
