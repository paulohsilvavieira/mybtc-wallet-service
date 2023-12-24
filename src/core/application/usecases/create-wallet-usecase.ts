import { Injectable } from '@nestjs/common';
import { CreateWalletBitcoin } from '@/core/domain/protocols/usecases/create-wallet';
import { BitcoinServiceProtocol } from '../../domain/protocols/services/bitcoin-service';
import { WalletRepo } from '@/core/domain/protocols/repositories/wallet-repository';
import { Asset } from '@/core/domain/entities/wallet';

@Injectable()
export class CreateWalletBitcoinUseCase implements CreateWalletBitcoin {
  constructor(
    private readonly bitcoinService: BitcoinServiceProtocol,
    private readonly walletRepository: WalletRepo,
  ) {}

  async execute(userId: string): Promise<{ address: string }> {
    const derivation = await this.walletRepository.getDerivation(Asset.BTC);
    const { secret, address } = await this.bitcoinService.generateAddress(
      derivation,
    );

    await this.walletRepository.saveWallet({
      id: this.walletRepository.generateId(),
      userId,
      address,
      secret,
      derivation,
      asset: Asset.BTC,
    });

    return {
      address,
    };
  }
}
