import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BitcoinService } from './services/bitcoin-services';
import { BitcoinServiceProtocol } from '@/core/domain/protocols/services';
import { WalletRepo } from '@/core/domain/protocols/repositories/wallet-repository';
import { WalletRepository } from './repositories/wallet-repository';

@Module({
  providers: [
    {
      provide: BitcoinServiceProtocol,
      useFactory(config: ConfigService) {
        return new BitcoinService(
          config.getOrThrow('BITCOIN_NETWORK'),
          config.getOrThrow('ROOT_MNEMONIC'),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: WalletRepo,
      useClass: WalletRepository,
    },
  ],
  exports: [WalletRepo, BitcoinServiceProtocol],
})
export class InfraModule {}
