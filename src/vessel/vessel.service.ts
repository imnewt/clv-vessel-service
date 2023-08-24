import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Vessel as VesselEntity } from 'src/entities';
import { FilterDto } from 'src/dtos/filter.dto';
import UpdateVesselDto from 'src/dtos/update-vessel.dto';
import CreateVesselDto from 'src/dtos/create-vessel.dto';

@Injectable()
export class VesselService {
  constructor(
    @InjectRepository(VesselEntity)
    private readonly vesselRepository: Repository<VesselEntity>,
  ) {}

  async getAllVessels(filter: FilterDto) {
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

  getVesselById(vesselId: string) {
    return this.vesselRepository.findOne({
      where: { id: vesselId },
    });
  }

  getVesselByCode(vesselCode: string) {
    return this.vesselRepository.findOne({
      where: { vsl_cd: vesselCode },
    });
  }

  async createVessel(dto: CreateVesselDto) {
    const vessel = await this.getVesselByCode(dto.vsl_cd);
    if (vessel) {
      throw new BadRequestException('Vessel code has been used!');
    }
    const newVessel = this.vesselRepository.create({
      ...dto,
      cre_dt: new Date(),
      upd_dt: new Date(),
    });
    return this.vesselRepository.save(newVessel);
  }

  async updateVessel(vesselId: string, updateVesselDto: UpdateVesselDto) {
    const vessel = await this.getVesselById(vesselId);
    if (!vessel) {
      throw new BadRequestException('Vessel not found!');
    }
    const updatedVessel = {
      ...vessel,
      ...updateVesselDto,
      upd_dt: new Date(),
    };
    return await this.vesselRepository.save(updatedVessel);
  }

  async deleteVessel(vesselId: string) {
    const vessel = await this.getVesselById(vesselId);
    if (!vessel) {
      throw new Error(`Vessel with id ${vesselId} not found!`);
    }
    return await this.vesselRepository.remove(vessel);
  }
}
