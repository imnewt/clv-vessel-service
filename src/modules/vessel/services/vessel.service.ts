import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { UpdateVesselDto } from '@vessel/dtos/update-vessel.dto';
import { CreateVesselDto } from '@vessel/dtos/create-vessel.dto';
import { Vessel } from '@shared/entities';
import { FilterDto } from '@shared/dtos/filter.dto';
import { BusinessException } from '@shared/exceptions/business.exception';
import { ERROR, MODULE } from '@shared/utilities/constants';

@Injectable()
export class VesselService {
  constructor(
    @InjectRepository(Vessel)
    private readonly vesselRepository: Repository<Vessel>,
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

  async getVesselById(vesselId: string) {
    const vessel = await this.vesselRepository.findOne({
      where: { id: vesselId },
    });
    if (!vessel) {
      throw new BusinessException(
        MODULE.VESSEL,
        [ERROR.VESSEL_NOT_FOUND],
        HttpStatus.NOT_FOUND,
      );
    }
    return vessel;
  }

  getVesselByCode(vesselCode: string) {
    return this.vesselRepository.findOne({
      where: { vsl_cd: vesselCode },
    });
  }

  async createVessel(dto: CreateVesselDto) {
    const vessel = await this.getVesselByCode(dto.vsl_cd);
    if (vessel) {
      throw new BusinessException(
        MODULE.VESSEL,
        [ERROR.VESSEL_CODE_HAS_BEEN_USED],
        HttpStatus.BAD_REQUEST,
      );
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
    const updatedVessel = {
      ...vessel,
      ...updateVesselDto,
      upd_dt: new Date(),
    };
    return await this.vesselRepository.save(updatedVessel);
  }

  async deleteVessel(vesselId: string) {
    const vessel = await this.getVesselById(vesselId);
    return await this.vesselRepository.remove(vessel);
  }
}
