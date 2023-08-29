import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './shared/configs/databaseConfig';
import { VesselModule } from './modules/vessel/vessel.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), VesselModule],
})
export class AppModule {}
