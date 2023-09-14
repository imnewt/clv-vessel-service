import { validate } from 'class-validator';

import { FilterDto } from '@domain/dtos/filter.dto';

describe('FilterDto', () => {
  it('should be defined', () => {
    const filterDto = new FilterDto();
    expect(filterDto).toBeDefined();
  });

  it('should create a valid FilterDto object with valid data', async () => {
    const filterDto = new FilterDto();
    filterDto.searchTerm = 'search';
    filterDto.pageNumber = 1;
    filterDto.pageSize = 10;

    const errors = await validate(filterDto);

    // Expect no validation errors
    expect(errors.length).toBe(0);
  });

  it('should fail validation if searchTerm is empty', async () => {
    const filterDto = new FilterDto();
    filterDto.pageNumber = 1;
    filterDto.pageSize = 10;

    const errors = await validate(filterDto);

    // Expect a validation error for missing searchTerm
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if pageNumber is empty', async () => {
    const filterDto = new FilterDto();
    filterDto.searchTerm = 'search';
    filterDto.pageSize = 10;

    const errors = await validate(filterDto);

    // Expect a validation error for missing pageNumber
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if pageSize is empty', async () => {
    const filterDto = new FilterDto();
    filterDto.searchTerm = 'search';
    filterDto.pageNumber = 1;

    const errors = await validate(filterDto);

    // Expect a validation error for missing pageSize
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
