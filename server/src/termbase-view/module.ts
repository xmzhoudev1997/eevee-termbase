import { Module } from '@nestjs/common';
import { TermbaseViewController } from './controller';
import { TermbaseViewService } from './service';

@Module({
  imports: [],
  controllers: [TermbaseViewController],
  providers: [TermbaseViewService]
})
export class TermbaseViewModule {}