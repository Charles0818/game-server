import { Exclude } from 'class-transformer';
import { IsEmpty, IsUUID } from 'class-validator';
import { WalletModel } from 'src/wallet/models/wallet.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => WalletModel, (wallet) => wallet.user, { onDelete: 'CASCADE' })
  wallet?: WalletModel;
}
