import { Type } from 'class-transformer';
import { IsEmpty, IsUUID } from 'class-validator';
import { ClubModel } from '../../club/models/clubs.model';
import { UserModel } from '../../user/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'donation_requests' })
export class DonationRequestsModel {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  @IsEmpty()
  id: string;

  @ManyToOne(() => UserModel, { nullable: false })
  @JoinColumn({ name: 'issuer' })
  issuer: UserModel;

  @ManyToOne(() => ClubModel)
  @JoinColumn({ name: 'club' })
  club: ClubModel;

  @ManyToOne(() => UserModel, { nullable: true })
  @JoinColumn({ name: 'donor' })
  donor: UserModel;

  @Column({
    name: 'soft_currency',
    type: 'float8',
    nullable: false,
  })
  softCurrency: number;

  @Column({
    type: 'boolean',
    name: 'fulfilled',
    default: false,
  })
  fulfilled: boolean;

  @CreateDateColumn()
  @Type(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Type(() => Date)
  updatedAt: Date;

  constructor(userClub: Partial<DonationRequestsModel>) {
    Object.assign(this, userClub);
  }
}
