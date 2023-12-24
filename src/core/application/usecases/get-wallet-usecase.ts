import { Asset, Wallet } from '@/core/domain/entities/wallet';
import { WalletRepo } from '@/core/domain/protocols/repositories/wallet-repository';
import { GetWallet } from '@/core/domain/protocols/usecases/get-wallet';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetWalletUseCase implements GetWallet {
  constructor(private readonly walletRepository: WalletRepo) {}
  async execute(params: { userId: string; asset: Asset }): Promise<Wallet> {
    return await this.walletRepository.getWallet(params);
  }
}
