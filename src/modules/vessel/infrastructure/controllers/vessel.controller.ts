import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { VesselService } from '../../services/vessel.service';
import CreateVesselDto from 'src/modules/vessel/dtos/create-vessel.dto';
import UpdateVesselDto from 'src/modules/vessel/dtos/update-vessel.dto';
import { Permission } from 'src/shared/decorators/permission.decorator';
import { PERMISSION } from 'src/shared/utilities/constants';

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

  @Permission(PERMISSION.READ_VESSEL)
  @Get(':id')
  async getVesselById(@Param('id') vesselId: string) {
    return this.vesselService.getVesselById(vesselId);
  }

  @Permission(PERMISSION.CREATE_VESSEL)
  @Post('/create')
  createVessel(@Body() createVesselDto: CreateVesselDto) {
    return this.vesselService.createVessel(createVesselDto);
  }

  @Permission(PERMISSION.UPDATE_VESSEL)
  @Patch(':id')
  updateVessel(
    @Param('id') vesselId: string,
    @Body() updateVesselDto: UpdateVesselDto,
  ) {
    return this.vesselService.updateVessel(vesselId, updateVesselDto);
  }

  @Permission(PERMISSION.DELETE_VESSEL)
  @Delete(':id')
  deleteVessel(@Param('id') vesselId: string) {
    return this.vesselService.deleteVessel(vesselId);
  }
}
