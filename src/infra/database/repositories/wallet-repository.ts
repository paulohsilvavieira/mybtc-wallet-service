import { Wallet, Asset } from '@/core/domain/entities/wallet';
import { WalletRepo } from '@/core/domain/protocols/repositories/wallet-repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { WalletEntity } from '../entities';

@Injectable()
export class WalletRepository implements WalletRepo {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}
  async saveWallet(wallet: Wallet): Promise<void> {
    await this.walletRepository.save(wallet);
  }
  async getDerivation(asset: Asset): Promise<number> {
    const wallet = await this.walletRepository.findOne({
      where: { asset },
      order: { derivation: 'DESC' },
    });

    return wallet ? wallet.derivation + 1 : 0;
  }
  generateId(): string {
    return randomUUID();
  }
  async getWallet(params: { userId: string; asset: Asset }): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneBy({
      asset: params.asset,
      userId: params.userId,
    });

    return wallet;
  }
}
