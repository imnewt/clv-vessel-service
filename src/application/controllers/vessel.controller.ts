import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Inject,
  Query,
  Patch,
} from '@nestjs/common';

import { CreateVesselDto, UpdateVesselDto } from '@domain/dtos';
import { IVesselService } from '@domain/use-cases/vessel';
import { Permission } from '@domain/decorators/permission.decorator';
import { PERMISSION } from '@domain/utilities/constants';

@Controller('vessels')
export class VesselController {
  constructor(
    @Inject(IVesselService) private readonly vesselService: IVesselService,
  ) {}

  @Permission(PERMISSION.READ_VESSEL)
  @Get()
  getVessels(
    @Query()
    query: {
      searchTerm: string;
      pageNumber: number;
      pageSize: number;
    },
  ) {
    const { searchTerm, pageNumber, pageSize } = query;
    return this.vesselService.getVessels({
      searchTerm,
      pageNumber,
      pageSize,
    });
  }

  @Permission(PERMISSION.READ_VESSEL)
  @Get(':id')
  getVesselById(@Param('id') vesselId: string) {
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
