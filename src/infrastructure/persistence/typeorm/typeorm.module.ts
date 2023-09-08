import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vessel } from './entities/vessel.entity';
import { TypeOrmVesselRepository } from './repositories/vessel.repository';
import { IVesselRepository } from '@domain/repositories/vessel.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Vessel])],
  providers: [
    {
      provide: IVesselRepository,
      useClass: TypeOrmVesselRepository,
    },
  ],
  exports: [
    {
      provide: IVesselRepository,
      useClass: TypeOrmVesselRepository,
    },
  ],
})
export class TypeOrmPersistenceModule {}
