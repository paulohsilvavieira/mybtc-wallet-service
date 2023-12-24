import { Asset, Wallet } from '../../entities/wallet';

export abstract class WalletRepo {
  saveWallet: (wallet: Wallet) => Promise<void>;
  getDerivation: (asset: Asset) => Promise<number>;
  generateId: () => string;
  getWallet: (params: { userId: string; asset: string }) => Promise<Wallet>;
}
