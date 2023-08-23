import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './configs/databaseConfig';
import { VesselModule } from './vessel/vessel.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), VesselModule],
})
export class AppModule {}
