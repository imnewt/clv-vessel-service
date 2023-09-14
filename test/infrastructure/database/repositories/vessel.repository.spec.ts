import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilterDto } from '@domain/dtos';
import { TypeOrmVesselRepository } from '@infrastructure/database/repositories';
import { Vessel } from '@infrastructure/database/entities/vessel.entity';

describe('TypeOrmVesselRepository', () => {
  let vesselRepository: TypeOrmVesselRepository;
  let mockRepository: Repository<Vessel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmVesselRepository,
        {
          provide: getRepositoryToken(Vessel),
          useClass: Repository,
        },
      ],
    }).compile();

    vesselRepository = module.get<TypeOrmVesselRepository>(
      TypeOrmVesselRepository,
    );
    mockRepository = module.get<Repository<Vessel>>(getRepositoryToken(Vessel));
  });

  describe('getVessels', () => {
    it('should return an array of vessels and total count', async () => {
      const filter: FilterDto = {
        searchTerm: 'searchTerm',
        pageNumber: 1,
        pageSize: 10,
      };
      const vessels = [new Vessel(), new Vessel()];
      const total = vessels.length;

      jest
        .spyOn(mockRepository, 'findAndCount')
        .mockResolvedValueOnce([vessels, total]);

      const result = await vesselRepository.getVessels(filter);

      expect(result.vessels).toBeInstanceOf(Array);
      expect(result.vessels.length).toBe(vessels.length);
      expect(result.total).toBe(total);
    });
  });

  describe('getVesselById', () => {
    it('should return a vessel by ID', async () => {
      const vesselId = 'some-id';
      const mockVessel = new Vessel();

      jest.spyOn(mockRepository, 'findOne').mockResolvedValueOnce(mockVessel);

      const result = await vesselRepository.getVesselById(vesselId);

      expect(result).toBe(mockVessel);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: vesselId },
      });
    });

    it('should return null if no vessel is found by ID', async () => {
      const vesselId = 'non-existent-id';

      jest.spyOn(mockRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await vesselRepository.getVesselById(vesselId);

      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: vesselId },
      });
    });
  });

  describe('getVesselByCode', () => {
    it('should return a vessel by code', async () => {
      const vesselCode = 'some-code';
      const mockVessel = new Vessel();

      jest.spyOn(mockRepository, 'findOne').mockResolvedValueOnce(mockVessel);

      const result = await vesselRepository.getVesselByCode(vesselCode);

      expect(result).toBe(mockVessel);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { vsl_cd: vesselCode },
      });
    });

    it('should return null if no vessel is found by code', async () => {
      const vesselCode = 'non-existent-code';

      jest.spyOn(mockRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await vesselRepository.getVesselByCode(vesselCode);

      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { vsl_cd: vesselCode },
      });
    });
  });

  describe('saveVessel', () => {
    it('should save a vessel', async () => {
      const mockVessel = new Vessel();

      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce(mockVessel);

      const result = await vesselRepository.saveVessel(mockVessel);

      expect(result).toBe(mockVessel);
      expect(mockRepository.save).toHaveBeenCalledWith(mockVessel);
    });
  });

  describe('deleteVessel', () => {
    it('should delete a vessel', async () => {
      const mockVessel = new Vessel();

      jest.spyOn(mockRepository, 'remove').mockResolvedValueOnce(null);

      await vesselRepository.deleteVessel(mockVessel);

      expect(mockRepository.remove).toHaveBeenCalledWith(mockVessel);
    });
  });
});
