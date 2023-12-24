import { Wallet, Asset } from '@/core/domain/entities/wallet';
import { WalletRepo } from '@/core/domain/protocols/repositories/wallet-repository';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class WalletRepository implements WalletRepo {
  public wallets: Wallet[] = [];
  async saveWallet(wallet: Wallet): Promise<void> {
    this.wallets.push(wallet);
  }
  async getDerivation(asset: Asset): Promise<number> {
    const wallet = this.wallets.find((wallet) => {
      return wallet.asset === asset;
    });
    return wallet ? wallet.derivation + 1 : 0;
  }
  generateId(): string {
    return randomUUID();
  }
  async getWallet(params: { userId: string; asset: string }): Promise<Wallet> {
    return this.wallets.find((wallet) => {
      return (
        wallet.asset === params.asset.toUpperCase() &&
        wallet.userId === params.userId
      );
    });
  }
}
