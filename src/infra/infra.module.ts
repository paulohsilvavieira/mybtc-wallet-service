import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BitcoinService } from './services/bitcoin-services';
import {
  BitcoinServiceProtocol,
  // PublishMessage,
} from '@/core/domain/protocols/services';
import { WalletRepo } from '@/core/domain/protocols/repositories/wallet-repository';
import { WalletRepository } from './database/repositories/wallet-repository';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
// import { MessageBrokerService } from './services/message-broker-service';
import { WalletEntity } from './database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendWalletWithdraw } from '@/core/domain/protocols/services/withdraw-service/withdraw';
import { WithdrawServiceGateway } from './services/withdraw-service';
const useFactoryForRabbitMQ = (configService: ConfigService) => {
  const rabbitConfig: RabbitMQConfig = {
    exchanges: [
      // {
      //   name: configService.get('EXCHANGE_NAME_BALANCE_SERVICE'),
      //   type: 'direct',
      // },
      // {
      //   name: configService.get('EXCHANGE_NAME_BALANCE_SERVICE') + '.dead',
      //   type: 'direct',
      // },
      {
        name: configService.get('EXCHANGE_WITHDRAW_SERVICE'),
        type: 'direct',
      },
      {
        name: configService.get('EXCHANGE_WITHDRAW_SERVICE') + '.dead',
        type: 'direct',
      },
    ],

    uri: configService.get('AMQP_URI_CONNECTION').toString(),
    connectionInitOptions: { wait: true },
  };
  return rabbitConfig;
};
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: useFactoryForRabbitMQ,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          username: configService.get('PG_USERNAME'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DATABASE'),
          host: configService.get('PG_HOST'),
          port: configService.get('PG_PORT'),
          entities: [__dirname + '/database/entities/index{.ts,.js}'],
          synchronize: false,
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([WalletEntity]),
  ],
  providers: [
    {
      provide: BitcoinServiceProtocol,
      useFactory(config: ConfigService) {
        return new BitcoinService(
          config.getOrThrow('BITCOIN_NETWORK'),
          config.getOrThrow('ROOT_MNEMONIC'),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: WalletRepo,
      useClass: WalletRepository,
    },
    {
      provide: SendWalletWithdraw,
      useClass: WithdrawServiceGateway,
    },
  ],
  exports: [WalletRepo, BitcoinServiceProtocol, SendWalletWithdraw],
})
export class InfraModule {}
