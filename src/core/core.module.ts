import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { GetWallet } from './domain/protocols/usecases/get-wallet';
import { GetWalletUseCase } from './application/usecases';
import { CreateWalletBitcoin } from './domain/protocols/usecases/bitcoin';
import { CreateWalletBitcoinUseCase } from './application/usecases/create-wallet-bitcoin-usecase';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: CreateWalletBitcoin,
      useClass: CreateWalletBitcoinUseCase,
    },
    {
      provide: GetWallet,
      useClass: GetWalletUseCase,
    },
  ],
  exports: [CreateWalletBitcoin, GetWallet],
})
export class CoreModule {}
