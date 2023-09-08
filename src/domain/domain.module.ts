import { Module } from '@nestjs/common';

import { TypeOrmPersistenceModule } from '@infrastructure/persistence/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmPersistenceModule],
  exports: [TypeOrmPersistenceModule],
})
export class DomainModule {}
