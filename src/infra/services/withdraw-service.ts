import {
  SendWalletWithdraw,
  SendWalletWithdrawParams,
} from '@/core/domain/protocols/services/withdraw-service/withdraw';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq/lib/amqp/connection';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WithdrawServiceGateway implements SendWalletWithdraw {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}
  async sendWallet(params: SendWalletWithdrawParams): Promise<void> {
    await this.amqpConnection.publish(
      this.configService.get('EXCHANGE_WITHDRAW_SERVICE'),
      this.configService.get('ROUTING_KEY_WITHDRAW_SERVICE'),
      params,
    );
  }
}
