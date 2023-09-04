import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { VesselService } from './vessel.service';
import { CreateVesselDto } from '../dtos/create-vessel.dto';
import { UpdateVesselDto } from '../dtos/update-vessel.dto';
import { Vessel } from '@shared/entities';
import { FilterDto } from '@shared/dtos/filter.dto';
import { BusinessException } from '@shared/exceptions/business.exception';
import { ERROR, MODULE } from '@shared/utilities/constants';
import { jwtConfig } from '@shared/configs/jwtConfig';

describe('VesselService', () => {
  let vesselService: VesselService;
  let vesselRepository: Repository<Vessel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register(jwtConfig)],
      providers: [
        VesselService,
        {
          provide: getRepositoryToken(Vessel),
          useClass: Repository,
        },
      ],
    }).compile();

    vesselService = module.get<VesselService>(VesselService);
    vesselRepository = module.get<Repository<Vessel>>(
      getRepositoryToken(Vessel),
    );
  });

  describe('getAllVessels', () => {
    it('should return an array of vessels and total count', async () => {
      const filter: FilterDto = {
        searchTerm: 'example',
        pageNumber: 1,
        pageSize: 10,
      };
      const vessels = [new Vessel(), new Vessel()];
      const total = 2;

      vesselRepository.findAndCount = jest
        .fn()
        .mockResolvedValue([vessels, total]);

      const result = await vesselService.getAllVessels(filter);

      expect(result.vessels).toBeInstanceOf(Array);
      expect(result.vessels.length).toBe(vessels.length);
      expect(result.total).toBe(total);
    });
  });

  describe('getVesselById', () => {
    it('should return a vessel by id', async () => {
      const vesselId = 'vessel_id';
      const vessel = new Vessel();
      vesselRepository.findOne = jest.fn().mockResolvedValue(vessel);

      const result = await vesselService.getVesselById(vesselId);

      expect(result).toBe(vessel);
    });

    it('should throw exception if vessel does not exist', async () => {
      const vesselId = 'non_existing_vessel_id';
      vesselRepository.findOne = jest.fn().mockResolvedValue(undefined);

      const result = vesselService.getVesselById(vesselId);

      await expect(result).rejects.toThrow(
        new BusinessException(
          MODULE.VESSEL,
          [ERROR.VESSEL_NOT_FOUND],
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('getVesselByCode', () => {
    it('should return a vessel by code', async () => {
      const vesselCode = 'vessel_code';
      const vessel = new Vessel();
      vesselRepository.findOne = jest.fn().mockResolvedValue(vessel);

      const result = await vesselService.getVesselByCode(vesselCode);

      expect(result).toBe(vessel);
    });
  });

  describe('createVessel', () => {
    it('should create a new vessel', async () => {
      const createVesselDto: CreateVesselDto = {
        vsl_cd: 'vessel_code',
      } as CreateVesselDto;

      vesselRepository.findOne = jest.fn().mockResolvedValue(undefined);
      vesselRepository.create = jest.fn().mockReturnValue(new Vessel());
      vesselRepository.save = jest.fn().mockReturnValue(new Vessel());

      const result = await vesselService.createVessel(createVesselDto);

      expect(result).toBeInstanceOf(Vessel);
    });

    it('should throw exception if vessel code has been used', async () => {
      const createVesselDto: CreateVesselDto = {
        vsl_cd: 'vessel_code',
      } as CreateVesselDto;
      const existedVessel = new Vessel();

      vesselRepository.findOne = jest.fn().mockResolvedValue(existedVessel);

      const result = vesselService.createVessel(createVesselDto);

      expect(result).rejects.toThrow(
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
      const vesselId = 'vessel_id';
      const updateVesselDto: UpdateVesselDto = {
        vsl_eng_nm: 'new_vessel_name',
      } as UpdateVesselDto;
      const updatedVessel = new Vessel();

      vesselRepository.findOne = jest.fn().mockResolvedValue(new Vessel());
      vesselRepository.save = jest.fn().mockResolvedValue(updatedVessel);

      const result = await vesselService.updateVessel(
        vesselId,
        updateVesselDto,
      );

      expect(result).toBe(updatedVessel);
    });

    it('should throw exception if vessel does not exist', async () => {
      const vesselId = 'vessel_id';
      const updateVesselDto: UpdateVesselDto = {
        vsl_eng_nm: 'new_vessel_name',
      } as UpdateVesselDto;

      vesselRepository.findOne = jest.fn().mockResolvedValue(undefined);

      const result = vesselService.updateVessel(vesselId, updateVesselDto);

      expect(result).rejects.toThrow(
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
      const vesselId = 'vessel_id';
      vesselRepository.findOne = jest.fn().mockResolvedValue(new Vessel());
      vesselRepository.remove = jest.fn().mockResolvedValue(undefined);

      const result = vesselService.deleteVessel(vesselId);

      await expect(result).resolves.toBeUndefined();
    });

    it('should throw exception if vessel does not exist', async () => {
      const vesselId = 'non_existing_vessel_id';
      vesselRepository.findOne = jest.fn().mockResolvedValue(undefined);

      const result = vesselService.deleteVessel(vesselId);

      await expect(result).rejects.toThrow(
        new BusinessException(
          MODULE.VESSEL,
          [ERROR.VESSEL_NOT_FOUND],
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
