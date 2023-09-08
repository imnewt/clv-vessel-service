import { Module } from '@nestjs/common';

import { VesselController } from './controllers/vessel.controller';
import { DomainModule } from '@domain/domain.module';
import { IVesselService } from '@domain/services/vessel.service.interface';
import { VesselServiceImplementation } from '@domain/implementations/vessel.service.implementation';

@Module({
  imports: [DomainModule],
  controllers: [VesselController],
  providers: [
    {
      provide: IVesselService,
      useClass: VesselServiceImplementation,
    },
  ],
})
export class ApplicationModule {}
