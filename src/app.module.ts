import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApplicationModule } from '@application/application.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { jwtConfig } from '@shared/configs/jwtConfig';

@Module({
  imports: [ApplicationModule, DatabaseModule, JwtModule.register(jwtConfig)],
})
export class AppModule {}
