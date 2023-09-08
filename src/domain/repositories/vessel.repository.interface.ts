import { Vessel } from '../models/vessel.model';
import { FilterDto } from '@shared/dtos/filter.dto';

export interface IVesselRepository {
  getVessels(filter: FilterDto): Promise<{ vessels: Vessel[]; total: number }>;
  getVesselById(vesselId: string): Promise<Vessel | null>;
  getVesselByCode(vesselCode: string): Promise<Vessel | null>;
  saveVessel(vessel: Vessel): Promise<Vessel>;
  deleteVessel(vessel: Vessel): Promise<void>;
}

export const IVesselRepository = Symbol('IVesselRepository');
