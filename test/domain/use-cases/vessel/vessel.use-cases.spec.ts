import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { CreateVesselDto, UpdateVesselDto } from '@domain/dtos';
import { IVesselRepository, VesselService } from '@domain/use-cases/vessel';
import { BusinessException } from '@domain/exceptions/business.exception';
import { ERROR, MODULE } from '@domain/utilities/constants';
import { Vessel } from '@infrastructure/database/entities/vessel.entity';

describe('VesselService', () => {
  let vesselService: VesselService;
  let vesselRepository: IVesselRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VesselService,
        {
          provide: IVesselRepository,
          useValue: {
            getVessels: jest.fn(),
            getVesselById: jest.fn(),
            getVesselByCode: jest.fn(),
            saveVessel: jest.fn(),
            deleteVessel: jest.fn(),
          },
        },
      ],
    }).compile();

    vesselService = module.get<VesselService>(VesselService);
    vesselRepository = module.get<IVesselRepository>(IVesselRepository);
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

      vesselRepository.getVessels = jest
        .fn()
        .mockResolvedValue({ vessels, total });

      const result = await vesselService.getVessels(query);

      expect(result.vessels).toBeInstanceOf(Array);
      expect(result.vessels.length).toBe(vessels.length);
      expect(result.total).toBe(total);
    });
  });

  describe('getVesselById', () => {
    it('should return a vessel by ID', async () => {
      const vesselId = '1';
      const vessel = new Vessel();

      jest.spyOn(vesselRepository, 'getVesselById').mockResolvedValue(vessel);

      expect(await vesselService.getVesselById(vesselId)).toBe(vessel);
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

      await expect(vesselService.getVesselById(vesselId)).rejects.toThrow(
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
        .spyOn(vesselRepository, 'getVesselByCode')
        .mockResolvedValue(undefined);
      jest
        .spyOn(vesselRepository, 'saveVessel')
        .mockResolvedValue(createdVessel);

      expect(await vesselService.createVessel(createVesselDto)).toBe(
        createdVessel,
      );
    });

    it('should throw exception if vessel code has been used', async () => {
      const createVesselDto: CreateVesselDto = {
        vsl_cd: 'used_vessel_code',
      } as CreateVesselDto;
      const existedVessel = new Vessel();

      jest
        .spyOn(vesselRepository, 'getVesselByCode')
        .mockResolvedValue(existedVessel);

      await expect(vesselService.createVessel(createVesselDto)).rejects.toThrow(
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
      const existedVessel = new Vessel();
      const updatedVessel = { ...updateVesselDto };

      jest
        .spyOn(vesselRepository, 'getVesselById')
        .mockResolvedValue(existedVessel);
      jest
        .spyOn(vesselRepository, 'saveVessel')
        .mockResolvedValue(updatedVessel);

      expect(await vesselService.updateVessel(vesselId, updateVesselDto)).toBe(
        updatedVessel,
      );
    });

    it('should throw exception if vessel does not exist', async () => {
      const vesselId = 'non_existing_vessel_id';
      const updateVesselDto: UpdateVesselDto = {
        vsl_cd: 'Vessel Code',
        vsl_eng_nm: 'Vessel English Name',
      } as UpdateVesselDto;

      jest
        .spyOn(vesselService, 'getVesselById')
        .mockRejectedValue(
          new BusinessException(
            MODULE.VESSEL,
            [ERROR.VESSEL_NOT_FOUND],
            HttpStatus.NOT_FOUND,
          ),
        );

      await expect(
        vesselService.updateVessel(vesselId, updateVesselDto),
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
      const vessel = new Vessel();

      jest.spyOn(vesselRepository, 'getVesselById').mockResolvedValue(vessel);
      jest.spyOn(vesselRepository, 'deleteVessel').mockResolvedValue();

      expect(await vesselService.deleteVessel(vesselId)).toBeUndefined();
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

      await expect(vesselService.deleteVessel(vesselId)).rejects.toThrow(
        new BusinessException(
          MODULE.VESSEL,
          [ERROR.VESSEL_NOT_FOUND],
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
