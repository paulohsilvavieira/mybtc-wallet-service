import { Injectable } from '@nestjs/common';
import { CreateWalletBitcoin } from '@/core/domain/protocols/usecases/bitcoin';
import { BitcoinServiceProtocol } from '../../domain/protocols/services/bitcoin/bitcoin-service';
import { WalletRepo } from '@/core/domain/protocols/repositories/wallet-repository';
import { Asset } from '@/core/domain/entities/wallet';
import { SendWalletWithdraw } from '@/core/domain/protocols/services/withdraw-service/withdraw';

@Injectable()
export class CreateWalletBitcoinUseCase implements CreateWalletBitcoin {
  constructor(
    private readonly bitcoinService: BitcoinServiceProtocol,
    private readonly walletRepository: WalletRepo,
    private readonly withdrawServiceGateway: SendWalletWithdraw,
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

    await this.withdrawServiceGateway.sendWallet({
      userId,
      address,
      secret,
      derivation,
    });

    return {
      address,
    };
  }
}
