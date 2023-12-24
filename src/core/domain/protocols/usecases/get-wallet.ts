import { Asset, Wallet } from '../../entities/wallet';

export abstract class GetWallet {
  execute: (params: { userId: string; asset: Asset }) => Promise<Wallet>;
}
