import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Vessel as VesselEntity } from 'src/entities';
import { jwtConfig } from 'src/configs/jwtConfig';
import { VesselController } from './vessel.controller';
import { VesselService } from './vessel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VesselEntity]),
    JwtModule.register(jwtConfig),
  ],
  controllers: [VesselController],
  providers: [VesselService],
})
export class VesselModule {}
