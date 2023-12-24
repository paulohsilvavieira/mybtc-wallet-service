export type Wallet = {
  userId: string;
  secret: string;
  address: string;
  asset: Asset;
  derivation: number;
  id: string;
};

export enum Asset {
  BTC = 'BTC',
}
