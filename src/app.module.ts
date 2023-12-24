import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    InfraModule,
    PresentationModule,
  ],
})
export class AppModule {}
