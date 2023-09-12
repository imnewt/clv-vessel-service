import { UpdateVesselDto } from '@application/dtos';
import { validate } from 'class-validator';

describe('UpdateVesselDto', () => {
  it('should be defined', () => {
    const updateVesselDto = new UpdateVesselDto();
    expect(updateVesselDto).toBeDefined();
  });

  it('should create a valid UpdateVesselDto object with valid data', async () => {
    const updateVesselDto = new UpdateVesselDto();
    updateVesselDto.vsl_cd = 'vessel_code';

    const errors = await validate(updateVesselDto);

    // Expect no validation errors
    expect(errors.length).toBe(0);
  });

  it('should fail validation if vessel code is empty', async () => {
    const updateVesselDto = new UpdateVesselDto();

    const errors = await validate(updateVesselDto);

    // Expect a validation error for missing vessel code
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
