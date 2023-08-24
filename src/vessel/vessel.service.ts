import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Vessel as VesselEntity } from 'src/entities';
import { FilterDto } from 'src/dtos/filter.dto';

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
          vsl_eng_nm: ILike(`%${searchTerm}%`),
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
}
