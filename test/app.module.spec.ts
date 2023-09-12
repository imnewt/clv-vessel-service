import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AppModule } from '@src/app.module';
import { ApplicationModule } from '@application/application.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { jwtConfig } from '@shared/configs/jwtConfig';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: JwtModule,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should import ApplicationModule', () => {
    const imports = Reflect.getMetadata('imports', AppModule);
    expect(imports).toContain(ApplicationModule);
  });

  it('should import DatabaseModule', () => {
    const imports = Reflect.getMetadata('imports', AppModule);
    expect(imports).toContain(DatabaseModule);
  });

  it('should import JwtModule', () => {
    const imports = Reflect.getMetadata('imports', AppModule);
    expect(imports).toContainEqual(JwtModule.register(jwtConfig));
  });
});
