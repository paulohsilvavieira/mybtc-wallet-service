import { mnemonicToSeedSync } from 'bip39';
import * as ecc from 'tiny-secp256k1';
import bip32 from 'bip32';
import { networks, payments } from 'bitcoinjs-lib';
import { Injectable } from '@nestjs/common';
import { BitcoinServiceProtocol } from '@/core/domain/protocols/services';

@Injectable()
export class BitcoinService implements BitcoinServiceProtocol {
  constructor(
    private readonly networkBitcoin: string,
    private readonly rootMnemonic: string,
  ) {}
  async generateAddress(
    derivation: number,
  ): Promise<{ secret: string; address: string }> {
    const bip32RootKey = this.getBip39Seed();
    const path = `m/44'/0'/0'/0/${derivation}`;
    const key = bip32RootKey.derivePath(path);
    const secret = key.toWIF();
    const { address } = payments.p2pkh({
      pubkey: key.publicKey,
      network: this.getNetworkBlockchain(),
    });
    return {
      address,
      secret,
    };
  }

  private getNetworkBlockchain() {
    if (this.networkBitcoin === 'regtest') {
      return networks.regtest;
    }
    if (this.networkBitcoin === 'testnet') {
      return networks.testnet;
    }
    return networks.bitcoin;
  }

  private getBip39Seed() {
    const seed = mnemonicToSeedSync(this.rootMnemonic);
    const network = this.getNetworkBlockchain();
    return bip32(ecc).fromSeed(seed, network);
  }
}
