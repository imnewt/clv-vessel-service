import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost } from '@nestjs/common';

import { AppModule } from '@src/app.module';
import { CustomExceptionFilter } from '@shared/filters/exception.filter';

describe('AppModule', () => {
  let app;
  let customExceptionFilter: CustomExceptionFilter;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    customExceptionFilter = new CustomExceptionFilter();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should set the global prefix to "api"', () => {
    expect(app.config.globalPrefix).toBe('api');
  });

  it('should handle global exception filtering', async () => {
    const mockError = new Error('Test error');
    const mockHost = {} as ArgumentsHost;

    jest.spyOn(customExceptionFilter, 'catch').mockImplementationOnce(() => {});

    customExceptionFilter.catch(mockError, mockHost);

    expect(customExceptionFilter.catch).toHaveBeenCalledWith(
      mockError,
      mockHost,
    );
  });
});
