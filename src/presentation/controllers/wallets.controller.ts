import { Asset } from '@/core/domain/entities/wallet';
import { CreateWalletBitcoin } from '@/core/domain/protocols/usecases/bitcoin';
import { GetWallet } from '@/core/domain/protocols/usecases/get-wallet';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('wallet')
export class WalletsController {
  constructor(
    private readonly createWalletBitcoin: CreateWalletBitcoin,
    private getWalletUseCase: GetWallet,
  ) {}

  @HttpCode(200)
  @Post('/btc/create')
  async createWallet(@Body() body: { userId: string }) {
    return await this.createWalletBitcoin.execute(body.userId);
  }
  @Get('/:asset/')
  async getWallet(
    @Param() param: { asset: Asset },
    @Query() query: { userId: string },
  ) {
    return await this.getWalletUseCase.execute({
      asset: param.asset,
      userId: query.userId,
    });
  }
}
