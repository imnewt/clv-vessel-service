import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vessel as VesselEntity } from 'src/entities';

@Injectable()
export class VesselService {
  constructor(
    @InjectRepository(VesselEntity)
    private readonly vesselRepository: Repository<VesselEntity>,
  ) {}

  async getAllVessels() {
    return await this.vesselRepository.find();
  }
}
