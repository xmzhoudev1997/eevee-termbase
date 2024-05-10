import { Controller} from '@nestjs/common';
import { TermbaseViewService } from './service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TermViewMicroController {
  constructor(
    private readonly service: TermbaseViewService,
    ) {}
  @MessagePattern('queryTermbaseByContent')
  query([content, locale]: string[]) {
    return this.service.query(content, locale);
  }
}
