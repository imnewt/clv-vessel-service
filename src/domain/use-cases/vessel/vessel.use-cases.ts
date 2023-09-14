import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IVesselService } from './vessel.service.interface';
import { IVesselRepository } from './vessel.repository.interface';
import { Vessel } from '@domain/models';
import { BusinessException } from '@domain/exceptions/business.exception';
import { ERROR, MODULE } from '@domain/utilities/constants';
import { FilterDto } from '@domain/dtos/filter.dto';

@Injectable()
export class VesselService implements IVesselService {
  constructor(
    @Inject(IVesselRepository)
    private readonly vesselRepository: IVesselRepository,
  ) {}

  async getVessels(
    filter: FilterDto,
  ): Promise<{ vessels: Vessel[]; total: number }> {
    return await this.vesselRepository.getVessels(filter);
  }

  async getVesselById(vesselId: string): Promise<Vessel | null> {
    const vessel = await this.vesselRepository.getVesselById(vesselId);
    if (!vessel) {
      throw new BusinessException(
        MODULE.VESSEL,
        [ERROR.VESSEL_NOT_FOUND],
        HttpStatus.NOT_FOUND,
      );
    }
    return vessel;
  }

  async createVessel(vessel: Vessel): Promise<Vessel> {
    const existedVessel = await this.vesselRepository.getVesselByCode(
      vessel.vsl_cd,
    );
    if (existedVessel) {
      throw new BusinessException(
        MODULE.VESSEL,
        [ERROR.VESSEL_CODE_HAS_BEEN_USED],
        HttpStatus.BAD_REQUEST,
      );
    }
    const newVessel = {
      ...vessel,
      cre_dt: new Date(),
      upd_dt: new Date(),
    };
    return this.vesselRepository.saveVessel(newVessel);
  }

  async updateVessel(vesselId: string, vessel: Vessel): Promise<Vessel> {
    const existedVessel = await this.getVesselById(vesselId);
    const updatedVessel = {
      ...existedVessel,
      ...vessel,
      upd_dt: new Date(),
    };
    return this.vesselRepository.saveVessel(updatedVessel);
  }

  async deleteVessel(vesselId: string): Promise<void> {
    const vessel = await this.getVesselById(vesselId);
    await this.vesselRepository.deleteVessel(vessel);
  }
}
