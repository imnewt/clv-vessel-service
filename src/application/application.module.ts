import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { VesselController } from './controllers/vessel.controller';
import { DomainModule } from '@domain/domain.module';
import { IVesselService, VesselService } from '@domain/use-cases/vessel';
import { AuthGuard } from '@domain/guards/auth.guard';

@Module({
  imports: [DomainModule],
  controllers: [VesselController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: IVesselService,
      useClass: VesselService,
    },
  ],
})
export class ApplicationModule {}
