import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vessel as VesselEntity } from 'src/entities';
import { VesselController } from './vessel.controller';
import { VesselService } from './vessel.service';

@Module({
  imports: [TypeOrmModule.forFeature([VesselEntity])],
  controllers: [VesselController],
  providers: [VesselService],
})
export class VesselModule {}
