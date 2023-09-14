import { Module } from '@nestjs/common';

import { VesselController } from './controllers/vessel.controller';
import { DomainModule } from '@domain/domain.module';
import { IVesselService, VesselService } from '@domain/use-cases/vessel';

@Module({
  imports: [DomainModule],
  controllers: [VesselController],
  providers: [
    {
      provide: IVesselService,
      useClass: VesselService,
    },
  ],
})
export class ApplicationModule {}
