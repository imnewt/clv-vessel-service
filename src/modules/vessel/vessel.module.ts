import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { VesselController } from './infrastructure/controllers/vessel.controller';
import { VesselService } from './services/vessel.service';
import { Vessel } from '@shared/entities';
import { jwtConfig } from '@shared/configs/jwtConfig';

@Module({
  imports: [TypeOrmModule.forFeature([Vessel]), JwtModule.register(jwtConfig)],
  controllers: [VesselController],
  providers: [VesselService],
})
export class VesselModule {}
