export type Wallet = {
  id: string;
  userId: string;
  derivation: number;
  secret: string;
  address: string;
  asset: Asset;
};

export enum Asset {
  BTC = 'BTC',
}
