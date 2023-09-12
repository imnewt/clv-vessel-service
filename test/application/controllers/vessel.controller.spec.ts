import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { VesselController } from '@application/controllers/vessel.controller';
import { CreateVesselDto, UpdateVesselDto } from '@application/dtos';
import { IVesselService } from '@domain/services/vessel.service.interface';
import { Vessel } from '@infrastructure/persistence/typeorm/entities/vessel.entity';
import { BusinessException } from '@shared/exceptions/business.exception';
import { ERROR, MODULE } from '@shared/utilities/constants';

describe('VesselController', () => {
  let vesselController: VesselController;
  let vesselService: IVesselService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VesselController],
      providers: [
        {
          provide: IVesselService,
          useValue: {
            getVessels: jest.fn(),
            getVesselById: jest.fn(),
            createVessel: jest.fn(),
            updateVessel: jest.fn(),
            deleteVessel: jest.fn(),
          },
        },
      ],
    }).compile();

    vesselController = module.get<VesselController>(VesselController);
    vesselService = module.get<IVesselService>(IVesselService);
  });

  describe('getVessels', () => {
    it('should return an array of vessels and total count', async () => {
      const query = {
        searchTerm: 'search',
        pageNumber: 1,
        pageSize: 10,
      };
      const vessels = [new Vessel(), new Vessel()];
      const total = 2;

      jest
        .spyOn(vesselService, 'getVessels')
        .mockResolvedValue({ vessels, total });

      const result = await vesselController.getVessels(query);

      expect(result.vessels).toBeInstanceOf(Array);
      expect(result.vessels.length).toBe(vessels.length);
      expect(result.total).toBe(total);
    });
  });

  describe('getVesselById', () => {
    it('should return a vessel by ID', async () => {
      const vesselId = '1';
      const vessel = new Vessel();

      jest.spyOn(vesselService, 'getVesselById').mockResolvedValue(vessel);

      expect(await vesselController.getVesselById(vesselId)).toBe(vessel);
    });

    it('should throw exception if vessel does not exist', async () => {
      const vesselId = 'non_existing_vessel_id';

      jest
        .spyOn(vesselService, 'getVesselById')
        .mockRejectedValue(
          new BusinessException(
            MODULE.VESSEL,
            [ERROR.VESSEL_NOT_FOUND],
            HttpStatus.NOT_FOUND,
          ),
        );

      await expect(vesselController.getVesselById(vesselId)).rejects.toThrow(
        new BusinessException(
          MODULE.VESSEL,
          [ERROR.VESSEL_NOT_FOUND],
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('createVessel', () => {
    it('should create a vessel', async () => {
      const createVesselDto: CreateVesselDto = {
        vsl_cd: 'new_vessel_code',
      } as CreateVesselDto;
      const createdVessel = { id: 'new_vessel_id', ...createVesselDto };

      jest
        .spyOn(vesselService, 'createVessel')
        .mockResolvedValue(createdVessel);

      expect(await vesselController.createVessel(createVesselDto)).toBe(
        createdVessel,
      );
    });

    it('should throw exception if vessel code has been used', async () => {
      const createVesselDto: CreateVesselDto = {
        vsl_cd: 'used_vessel_code',
      } as CreateVesselDto;

      jest
        .spyOn(vesselService, 'createVessel')
        .mockRejectedValue(
          new BusinessException(
            MODULE.VESSEL,
            [ERROR.VESSEL_CODE_HAS_BEEN_USED],
            HttpStatus.BAD_REQUEST,
          ),
        );

      await expect(
        vesselController.createVessel(createVesselDto),
      ).rejects.toThrow(
        new BusinessException(
          MODULE.VESSEL,
          [ERROR.VESSEL_CODE_HAS_BEEN_USED],
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('updateVessel', () => {
    it('should update a vessel', async () => {
      const vesselId = '1';
      const updateVesselDto: UpdateVesselDto = {
        vsl_cd: 'Vessel Code',
        vsl_eng_nm: 'Vessel English Name',
      } as UpdateVesselDto;
      const updatedVessel = { ...updateVesselDto };

      jest
        .spyOn(vesselService, 'updateVessel')
        .mockResolvedValue(updatedVessel);

      expect(
        await vesselController.updateVessel(vesselId, updateVesselDto),
      ).toBe(updatedVessel);
    });

    it('should throw exception if vessel does not exist', async () => {
      const vesselId = 'non_existing_vessel_id';
      const updateVesselDto: UpdateVesselDto = {
        vsl_cd: 'Vessel Code',
        vsl_eng_nm: 'Vessel English Name',
      } as UpdateVesselDto;

      jest
        .spyOn(vesselService, 'updateVessel')
        .mockRejectedValue(
          new BusinessException(
            MODULE.VESSEL,
            [ERROR.VESSEL_NOT_FOUND],
            HttpStatus.NOT_FOUND,
          ),
        );

      await expect(
        vesselController.updateVessel(vesselId, updateVesselDto),
      ).rejects.toThrow(
        new BusinessException(
          MODULE.VESSEL,
          [ERROR.VESSEL_NOT_FOUND],
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('deleteVessel', () => {
    it('should delete a vessel', async () => {
      const vesselId = '1';
      jest.spyOn(vesselService, 'deleteVessel').mockResolvedValue();

      expect(await vesselController.deleteVessel(vesselId)).toBeUndefined();
    });

    it('should throw exception if vessel does not exist', async () => {
      const vesselId = 'non_existing_vessel_id';

      jest
        .spyOn(vesselService, 'deleteVessel')
        .mockRejectedValue(
          new BusinessException(
            MODULE.VESSEL,
            [ERROR.VESSEL_NOT_FOUND],
            HttpStatus.NOT_FOUND,
          ),
        );

      await expect(vesselController.deleteVessel(vesselId)).rejects.toThrow(
        new BusinessException(
          MODULE.VESSEL,
          [ERROR.VESSEL_NOT_FOUND],
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
