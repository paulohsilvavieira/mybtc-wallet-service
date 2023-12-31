export abstract class SendWalletWithdraw {
  sendWallet: (params: SendWalletWithdrawParams) => Promise<void>;
}

export type SendWalletWithdrawParams = {
  userId: string;
  address: string;
  secret: string;
  derivation: number;
};
