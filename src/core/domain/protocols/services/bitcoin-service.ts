export abstract class BitcoinServiceProtocol {
  generateAddress: (derivation: number) => Promise<{
    secret: string;
    address: string;
  }>;
}
