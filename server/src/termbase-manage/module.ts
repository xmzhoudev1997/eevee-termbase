import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOG_INFO } from 'src/database-mysql/entity/log';
import { TERMBASE_INFO } from 'src/database-mysql/entity/termbase';
import { TermbaseManageController } from './controller';
import { TermbaseManageService } from './service';
import { TermbaseCacheService } from './cache';

@Module({
  imports: [TypeOrmModule.forFeature([LOG_INFO, TERMBASE_INFO])],
  controllers: [TermbaseManageController],
  providers: [TermbaseManageService, TermbaseCacheService]
})
export class TermbaseManageModule {}