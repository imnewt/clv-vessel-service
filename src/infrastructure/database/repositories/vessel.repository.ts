import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Vessel } from '../entities/vessel.entity';
import { IVesselRepository } from '@domain/use-cases/vessel/vessel.repository.interface';
import { FilterDto } from '@domain/dtos/filter.dto';

@Injectable()
export class TypeOrmVesselRepository implements IVesselRepository {
  constructor(
    @InjectRepository(Vessel)
    private readonly vesselRepository: Repository<Vessel>,
  ) {}

  async getVessels(
    filter: FilterDto,
  ): Promise<{ vessels: Vessel[]; total: number }> {
    const { searchTerm, pageNumber, pageSize } = filter;
    const [vessels, total] = await this.vesselRepository.findAndCount({
      where: [
        {
          vsl_cd: ILike(`%${searchTerm}%`),
        },
      ],
      order: {
        cre_dt: 'desc',
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
    return { vessels, total };
  }

  async getVesselById(vesselId: string): Promise<Vessel | null> {
    return await this.vesselRepository.findOne({
      where: { id: vesselId },
    });
  }

  async getVesselByCode(vesselCode: string): Promise<Vessel | null> {
    return await this.vesselRepository.findOne({
      where: { vsl_cd: vesselCode },
    });
  }

  async saveVessel(vessel: Vessel): Promise<Vessel> {
    return this.vesselRepository.save(vessel);
  }

  async deleteVessel(vessel: Vessel): Promise<void> {
    await this.vesselRepository.remove(vessel);
  }
}
