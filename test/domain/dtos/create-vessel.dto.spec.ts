import { CreateVesselDto } from '@domain/dtos';
import { validate } from 'class-validator';

describe('CreateVesselDto', () => {
  it('should be defined', () => {
    const createVesselDto = new CreateVesselDto();
    expect(createVesselDto).toBeDefined();
  });

  it('should create a valid CreateVesselDto object with valid data', async () => {
    const createVesselDto = new CreateVesselDto();
    createVesselDto.vsl_cd = 'vessel_code';

    const errors = await validate(createVesselDto);

    // Expect no validation errors
    expect(errors.length).toBe(0);
  });

  it('should fail validation if vessel code is empty', async () => {
    const createVesselDto = new CreateVesselDto();

    const errors = await validate(createVesselDto);

    // Expect a validation error for missing vessel code
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
