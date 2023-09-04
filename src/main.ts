import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { VESSEL_SERVICE_PORT } from '@shared/utilities/constants';
import { CustomExceptionFilter } from '@shared/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(VESSEL_SERVICE_PORT);
}
bootstrap();
