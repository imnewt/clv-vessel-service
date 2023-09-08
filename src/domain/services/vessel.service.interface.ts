import { Vessel } from '../models/vessel.model';
import { FilterDto } from '@shared/dtos/filter.dto';

export interface IVesselService {
  getVessels(filter: FilterDto): Promise<{ vessels: Vessel[]; total: number }>;
  getVesselById(vesselId: string): Promise<Vessel | null>;
  createVessel(vessel: Vessel): Promise<Vessel>;
  updateVessel(vesselId: string, vessel: Vessel): Promise<Vessel>;
  deleteVessel(vesselId: string): Promise<void>;
}
export const IVesselService = Symbol('IVesselService');
