import { Module } from '@nestjs/common';
import { TermbaseViewController } from './controller';
import { TermbaseViewService } from './service';
import { TermViewMicroController } from './micro';

@Module({
  imports: [],
  controllers: [TermbaseViewController, TermViewMicroController],
  providers: [TermbaseViewService]
})
export class TermbaseViewModule {}