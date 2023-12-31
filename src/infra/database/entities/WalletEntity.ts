import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Asset } from '@/core/domain/entities/wallet';
@Entity({
  name: 'wallets',
})
export class WalletEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  derivation: number;

  @Column()
  @Index()
  asset: Asset;

  @Column()
  address: string;

  @Column()
  secret: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
