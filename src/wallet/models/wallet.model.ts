import { IsEmpty, IsUUID } from 'class-validator';
import { UserModel } from '../../user/models/user.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
export enum GenderTypes {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'wallets' })
export class WalletModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty()
  @IsUUID('4')
  id?: string;

  @Column({
    name: 'soft_currency',
    type: 'float8',
    default: 0,
  })
  softCurrency: number;

  @Column({
    name: 'hard_currency',
    type: 'float8',
    default: 0,
  })
  hardCurrency: number;

  @OneToOne(() => UserModel, (user) => user.wallet, { nullable: false })
  @JoinColumn({ name: 'user' })
  user?: UserModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
