import { CoreModule } from '@/core/core.module';
import { Module } from '@nestjs/common';
import { WalletsController } from './controllers/wallets.controller';

@Module({
  imports: [CoreModule],
  controllers: [WalletsController],
})
export class PresentationModule {}
