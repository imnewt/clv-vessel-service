import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { VESSEL_SERVICE_PORT } from './shared/utilities/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(VESSEL_SERVICE_PORT);
}
bootstrap();
