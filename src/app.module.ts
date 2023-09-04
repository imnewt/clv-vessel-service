import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VesselModule } from '@vessel/vessel.module';
import { databaseConfig } from '@shared/configs/databaseConfig';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), VesselModule],
})
export class AppModule {}
