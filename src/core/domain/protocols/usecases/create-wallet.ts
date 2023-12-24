export abstract class CreateWalletBitcoin {
  execute: (userId: string) => Promise<{
    address: string;
  }>;
}
