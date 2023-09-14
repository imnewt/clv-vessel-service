import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { IVesselRepository } from '@domain/use-cases/vessel/vessel.repository.interface';
import { databaseConfig } from './configs/database.config';
import { jwtConfig } from './configs/jwt.config';
import { Vessel } from './database/entities';
import { TypeOrmVesselRepository } from './database/repositories';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Vessel]),
    JwtModule.register(jwtConfig),
  ],
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
export class InfrastructureModule {}
