import { Controller, Get, Query } from '@nestjs/common';

import { Permission } from 'src/decorators/permission.decorator';
import { PERMISSION } from 'src/utils/constants';
import { VesselService } from './vessel.service';

@Controller('vessels')
export class VesselController {
  constructor(private readonly vesselService: VesselService) {}

  @Permission(PERMISSION.READ_VESSEL)
  @Get()
  getAllVessels(
    @Query()
    query: {
      searchTerm: string;
      pageNumber: number;
      pageSize: number;
    },
  ) {
    const { searchTerm, pageNumber, pageSize } = query;
    return this.vesselService.getAllVessels({
      searchTerm,
      pageNumber,
      pageSize,
    });
  }
}
